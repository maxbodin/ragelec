'use client'
import { Card, CardBody, CardHeader } from '@nextui-org/card'

export const Error = ({
   content,
   status,
}: {
   content: string
   status: number
}) => {
   return (
      <div className="p-4 justify-start justify-self-start justify-items-start">
         <Card
            className={`flex min-w-[50%] max-w-[80%] max-h-[40%] p-4 invalid-card`}
         >
            <CardHeader>
               <h1 className="font-bold">Erreur {status} : </h1>
            </CardHeader>
            <CardBody>{content}</CardBody>
         </Card>
      </div>
   )
}
