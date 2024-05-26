import React, { createContext, ReactNode, useContext, useState } from 'react'
import { ChatMessage } from '@/app/types'

interface ChatContextValue {
   messages: ChatMessage[]
   setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>
}

const ChatContext = createContext<ChatContextValue | null>(null)

export function useChat(): ChatContextValue {
   const context = useContext(ChatContext)
   if (!context) {
      throw new Error('useChat must be used within a ChatProvider')
   }
   return context
}

// Provider component.
export function ChatProvider({ children }: { children: ReactNode }) {
   const [messages, setMessages] = useState<ChatMessage[]>([
      {
         type: 'info',
      },
   ])

   const value: ChatContextValue = {
      messages: messages,
      setMessages: setMessages,
   }

   return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
