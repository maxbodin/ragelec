export interface ChatBotSource {
   id: string
   page: number
   source: string
}

export interface ChatBotResponse {
   answer?: string
   error?: string
   sources?: ChatBotSource[]
}

export interface ChatMessage {
   type: 'info' | 'question' | 'answer' | 'file' | 'error'
   status?: number
   content?: string
   fileName?: string
   sources?: ChatBotSource[]
}
