import logging
import os
import sys

import requests
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from langchain.prompts import ChatPromptTemplate
from langchain_community.vectorstores import Chroma

from get_embedding_function import get_embedding_function

logging.basicConfig(stream=sys.stdout, level=logging.INFO)
logging.getLogger().addHandler(logging.StreamHandler(stream=sys.stdout))

app = Flask(__name__)

PROMPT_TEMPLATE = """
Tu es un assistant qui a pour objectif de fournir des informations sur les normes de sécurité et de qualité sur l'électricité.
Réponds en français à la question en t'appuyant sur le contexte suivant : {context}

Ne réponds que si tu connais la réponse.
Tu ne dois pas inventer la réponse et tu ne dois pas faire de suppositions.
N'écris pas la question ou le contexte à nouveau, ne donne que la réponse uniquement.
Tu ne dois jamais écrire la question dans ta réponse.

Réponds en français à la question en t'appuyant sur le contexte au-dessus : {question}
"""


@app.route("/api/request", methods=["POST"])
def query_chat():
    load_dotenv()
    data = request.get_json()

    if 'question' not in data:
        return jsonify({"error": "No question provided"}), 400

    user_question = data['question']

    # Prepare the DB.
    db = Chroma(persist_directory=os.getenv('CHROMA_PATH'), embedding_function=get_embedding_function())

    # Search the DB.
    results = db.similarity_search_with_score(user_question, k=5)

    # print(results)

    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, question=user_question)

    response = requests.post(os.getenv('API_URL'), headers={"Authorization": f"Bearer {os.getenv('HF_TOKEN')}"}, json={
        "inputs": prompt,
    }).json()

    search_phrase = user_question

    generated_text = response[0]['generated_text']
    start_index = generated_text.find(search_phrase)

    if start_index != -1:
        extracted_text = generated_text[start_index + len(search_phrase):].strip()

        all_metadata = [document.metadata for document, _ in results]
        return jsonify({"answer": extracted_text, "sources": all_metadata})

        # Translate response.
        # translated_response = requests.post(os.getenv('TRAD_API_URL'),
        #                                     headers={"Authorization": f"Bearer {os.getenv('HF_TOKEN')}"},
        #                                     json={
        #                                         "inputs": extracted_text,
        #                                     }).json()
        #
        # return jsonify({"answer": translated_response[0]["translation_text"]})
    else:
        return jsonify({"error": f"Impossible d'obtenir une réponse !"})


@app.route('/api/files', methods=['GET'])
def list_files():
    load_dotenv()

    try:
        files = os.listdir(os.getenv('DATA_PATH'))
        file_list = [{'name': file} for file in files if os.path.isfile(os.path.join(os.getenv('DATA_PATH'), file))]
        return jsonify(file_list)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.errorhandler(404)
def page_not_found(e):
    return jsonify({"status": 404, "message": "Page non trouvée."}), 404
