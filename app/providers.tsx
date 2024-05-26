'use client'

import { NextUIProvider } from '@nextui-org/react'
import { ChatProvider } from '@/app/providers/chatProvider'
import React from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
   return (
      <NextUIProvider>
         <ChatProvider>{children}</ChatProvider>
      </NextUIProvider>
   )
}
