import { Chip } from '@nextui-org/chip'
import { PDFIcon } from '@/app/icons/pdfIcon'
import { useChat } from '@/app/providers/chatProvider'
import { ChatMessage } from '@/app/types'

export const FileChip = ({ fileName }: { fileName: string }) => {
   const { setMessages } = useChat()

   const addMessage = (newMessage: ChatMessage): void => {
      setMessages((prevMessages: ChatMessage[]) => [
         ...prevMessages,
         newMessage,
      ])
   }

   const removePageInfo = (filename: string): string => {
      return filename.replace(/\s+page:.*$/, '')
   }

   const onClick = (): void => {
      addMessage({ type: 'file', fileName: removePageInfo(fileName) })
   }

   return (
      <div className="p-1">
         <Chip
            radius="sm"
            variant="bordered"
            onClick={onClick}
            startContent={<PDFIcon />}
         >
            {fileName}
         </Chip>
      </div>
   )
}
