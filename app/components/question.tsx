'use client'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Chip } from '@nextui-org/chip'

export const Question = ({ content }: { content: string }) => {
   return (
      <div className="p-4 flex justify-end justify-self-end justify-items-end">
         <Card
            className={`flex min-w-[30vh] max-w-[80%] max-h-[40%] p-4 rounded-br-none`}
         >
            <CardHeader>
               <Chip color="default" variant="bordered">
                  Vous
               </Chip>
            </CardHeader>
            <CardBody>{content}</CardBody>
         </Card>
      </div>
   )
}
