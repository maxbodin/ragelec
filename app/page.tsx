'use client'

import AppNavBar from '@/app/components/appnavbar'
import { FilesList } from '@/app/components/filesList'
import { Chat } from '@/app/components/chat'

export default function App() {
   return (
      <main className="flex flex-col">
         <AppNavBar />
         <div className="flex flex-row pt-4">
            <FilesList />
            <div
               className="h-full flex flex-col justify-between items-center 
             font-mono text-sm w-full pr-[20vh]"
            >
               <Chat />
            </div>
         </div>
      </main>
   )
}
