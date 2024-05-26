'use client'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Chip } from '@nextui-org/chip'
import { Divider } from '@nextui-org/divider'
import { ChatBotSource } from '@/app/types'
import { FileChip } from '@/app/components/fileChip'

export const Answer = ({
   content,
   sources,
}: {
   content: string
   sources: ChatBotSource[]
}) => {
   return (
      <div className="p-4 flex justify-start justify-self-start justify-items-start">
         <Card
            className={`flex min-w-[50%] max-w-[80%] max-h-[40%] p-4 rounded-bl-none`}
         >
            <CardHeader>
               <div className="flex justify-between">
                  <Chip color="warning" variant="bordered">
                     RagÉlec ⚡
                  </Chip>
               </div>
            </CardHeader>
            <CardBody>{content}...</CardBody>
            <CardFooter className="pt-8 pb-4">
               <div className="flex flex-col">
                  <Divider className="my-4" orientation="horizontal" />
                  {sources.length <= 0 && (
                     <h3 className="text-xs font-bold">
                        Impossible de récupérer les documents utilisés pour la
                        réponse.
                     </h3>
                  )}

                  {sources.length > 0 && (
                     <>
                        <h3 className="text-xs font-bold">
                           Documents utilisés pour la réponse :
                        </h3>
                        <div className="flex flex-row flex-wrap pt-4 max-w-[80%]">
                           {sources.map(
                              (source: ChatBotSource, index: number) => {
                                 return (
                                    <FileChip
                                       key={index}
                                       fileName={source.source}
                                    />
                                 )
                              }
                           )}
                        </div>
                     </>
                  )}
               </div>
            </CardFooter>
         </Card>
      </div>
   )
}
