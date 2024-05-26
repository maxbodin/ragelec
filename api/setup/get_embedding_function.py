import os

from dotenv import load_dotenv
from langchain_community.embeddings import HuggingFaceInferenceAPIEmbeddings


def get_embedding_function():
    load_dotenv()

    embeddings = HuggingFaceInferenceAPIEmbeddings(
        api_key=os.getenv('HF_TOKEN'),
        model_name="thenlper/gte-large")

    # embeddings = OllamaEmbeddings(model="mxbai-embed-large")

    return embeddings
