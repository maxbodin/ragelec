import { useEffect, useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { FileChip } from '@/app/components/fileChip'

export const FilesList = () => {
   const [files, setFiles] = useState<{ name: string }[]>([])

   const [failedToLoadList, setFailedToLoadList] = useState<boolean>(false)

   useEffect((): void => {
      const fetchData = async (): Promise<void> => {
         try {
            const response: Response = await fetch('/api/files')
            if (!response.ok) {
               setFailedToLoadList(true)
            }
            let data = await response.json()
            // Sort files alphabetically by name.
            data = data.sort(compareFiles)
            setFiles(data)
         } catch (error) {
            setFailedToLoadList(true)
            console.error('Erreur lors de la récupération des fichiers:', error)
         }
      }

      fetchData()
   }, [])

   // Custom sorting function for files.
   const compareFiles = (a: { name: string }, b: { name: string }): number => {
      // Split the file names into numeric and non-numeric parts.
      const aParts: string[] = a.name.split(/(\d+)/).filter(Boolean)
      const bParts: string[] = b.name.split(/(\d+)/).filter(Boolean)

      // Compare the numeric parts as numbers.
      const numericComparison: number =
         parseInt(aParts[1]) - parseInt(bParts[1])

      // If numeric parts are equal, compare the non-numeric parts alphabetically.
      if (numericComparison === 0) {
         return aParts[0].localeCompare(bParts[0])
      }

      return numericComparison
   }

   return (
      <div>
         <Card
            className={`flex max-h-[40%] rounded-l-none p-4 ${failedToLoadList ? 'invalid-card' : ''}`}
         >
            <CardHeader>
               {!failedToLoadList && (
                  <h1 className="font-bold">Liste des fichiers utilisés :</h1>
               )}
               {failedToLoadList && (
                  <h1 className="font-bold">
                     Impossible de charger la liste des fichiers.
                  </h1>
               )}
            </CardHeader>
            {!failedToLoadList && (
               <CardBody>
                  {files.map((file: { name: string }, index: number) => (
                     <FileChip key={index} fileName={file.name} />
                  ))}
               </CardBody>
            )}
            {!failedToLoadList && (
               <CardFooter className="pt-8 pb-8">
                  <h3 className="text-small">
                     Cliquez sur un fichier pour l'afficher !
                  </h3>
               </CardFooter>
            )}
         </Card>
      </div>
   )
}
