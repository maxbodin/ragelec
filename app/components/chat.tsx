'use client'

import Info from '@/app/components/info'
import { File } from '@/app/components/file'
import { Question } from '@/app/components/question'
import React, { useMemo, useState } from 'react'
import { Textarea } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { Answer } from '@/app/components/answer'
import { Error } from '@/app/components/error'
import { ChatBotResponse, ChatBotSource, ChatMessage } from '@/app/types'
import { useChat } from '@/app/providers/chatProvider'

export const Chat = () => {
   const { messages, setMessages } = useChat()

   const [prompt, setPrompt] = useState<string>('')
   const [loadingAnswer, setLoadingAnswer] = useState<boolean>(false)

   const addMessage = (newMessage: ChatMessage): void => {
      setMessages((prevMessages: ChatMessage[]) => [
         ...prevMessages,
         newMessage,
      ])
   }

   const validatePrompt = (value: string) => value.match(/^.{10,200}$/s)

   const isInvalid: boolean = useMemo((): boolean => {
      if (prompt === '') return false

      return !validatePrompt(prompt)
   }, [prompt])

   const handleSendMessage = async (): Promise<void> => {
      if (!prompt.trim()) {
         return
      }

      addMessage({ type: 'question', content: prompt })
      setPrompt('')

      setLoadingAnswer(true)

      try {
         const response: Response = await fetch('/api/request', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: prompt }),
         })

         if (!response.ok) {
            addMessage({
               type: 'error',
               status: response.status,
               content: response.statusText,
            })
            setLoadingAnswer(false)
            return
         }

         const data: ChatBotResponse = await response.json()

         if (!data || !data.answer || data.error) {
            addMessage({
               type: 'error',
               content: data.error,
            })
            setLoadingAnswer(false)
            return
         }

         data.sources?.forEach((value: ChatBotSource): void => {
            value.source = `${value.source.split('/').pop() ?? ''} page: ${value.page}`
         })

         addMessage({
            type: 'answer',
            content: data.answer.toString(),
            sources: data.sources ?? [],
         })
         setLoadingAnswer(false)
      } catch (error) {
         console.error("Impossible d'envoyer la question :", error)
         addMessage({
            type: 'error',
            content:
               "Erreur lors de l'envoi de la question. Merci de réessayer.",
         })
         setLoadingAnswer(false)
      }
   }

   const handleKeyDown = (
      event: React.KeyboardEvent<HTMLTextAreaElement>
   ): void => {
      if (event.shiftKey && event.key === 'Enter') {
         event.preventDefault()
         handleSendMessage()
      }
   }

   return (
      <>
         <div className="max-h-[78vh] overflow-auto flex flex-col items-center justify-evenly font-mono text-sm p-4">
            {messages.map((message: ChatMessage, index: number) => {
               if (message.type === 'info') {
                  return <Info key={index} />
               }
               if (message.type === 'question') {
                  return (
                     <Question
                        key={index}
                        content={
                           message.content ??
                           'Impossible de récupérer la question.'
                        }
                     />
                  )
               }
               if (message.type === 'answer') {
                  return (
                     <Answer
                        key={index}
                        content={
                           message.content ??
                           'Impossible de récupérer la réponse.'
                        }
                        sources={message.sources ?? []}
                     />
                  )
               }
               if (message.type === 'error') {
                  return (
                     <Error
                        key={index}
                        status={message.status ?? 404}
                        content={
                           message.content ??
                           "Impossible de récupérer l'erreur."
                        }
                     />
                  )
               }
               if (message.type === 'file') {
                  return (
                     <File
                        key={index}
                        fileName={
                           message.fileName ??
                           'Impossible de récupérer le fichier.'
                        }
                     />
                  )
               }
               return null
            })}
         </div>

         <Textarea
            value={prompt}
            size="sm"
            variant="flat"
            label="Poser votre question"
            labelPlacement="outside"
            placeholder="Votre question..."
            isInvalid={isInvalid}
            isDisabled={loadingAnswer}
            color={isInvalid ? 'danger' : 'default'}
            errorMessage={
               isInvalid && 'La question doit faire entre 10 et 200 caractères.'
            }
            onValueChange={setPrompt}
            className="max-w-5xl w-full p-4"
            enterKeyHint="send"
            onKeyDown={(e) =>
               handleKeyDown(e as React.KeyboardEvent<HTMLTextAreaElement>)
            }
            endContent={
               <Button
                  isDisabled={isInvalid || prompt.length <= 0}
                  isLoading={loadingAnswer}
                  variant="bordered"
                  color="warning"
                  onClick={handleSendMessage}
               >
                  Envoyer
               </Button>
            }
         />
      </>
   )
}
