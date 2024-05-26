'use client'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Document, Page, pdfjs } from 'react-pdf'
import { useState } from 'react'
import { PDFDocumentProxy } from 'pdfjs-dist'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Link } from '@nextui-org/link'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
   'pdfjs-dist/build/pdf.worker.min.js',
   import.meta.url
).toString()

export const File = ({ fileName }: { fileName: string }) => {
   const [numPages, setNumPages] = useState<number>()
   const [pageNumber, setPageNumber] = useState<number>(1)
   const [isFileValid, setIsFileValid] = useState<boolean>(false)

   function onDocumentLoadSuccess({ numPages }: PDFDocumentProxy): void {
      setNumPages(numPages)
      setPageNumber(1)
      // Set file validity to true when successfully loaded.
      setIsFileValid(true)
   }

   function onDocumentLoadError(): void {
      // Set file validity to false when error occurs.
      setIsFileValid(false)
   }

   function changePage(offset: number): void {
      setPageNumber((prevPageNumber) => prevPageNumber + offset)
   }

   function previousPage(): void {
      if (pageNumber > 1) {
         changePage(-1)
      }
   }

   function nextPage(): void {
      if (pageNumber < (numPages ?? 0)) {
         changePage(1)
      }
   }

   const sources: { name: string; link: string }[] = [
      { name: 'Enedis', link: 'https://www.enedis.fr/documents' },
      {
         name: 'Sitelec',
         link: 'https://sitelec.org/edf/sequelec/sequelec.htm',
      },
      {
         name: 'Promotelec',
         link: 'https://www.promotelec.com/professionnels/fiche/les-fiches-sequelec-une-documentation-indispensable-pour-les-electriciens/',
      },
   ]

   return (
      <div className="p-4">
         <Card
            className={`flex max-h-[40%] p-4 ${isFileValid ? '' : 'invalid-card'}`}
         >
            {isFileValid && (
               <CardHeader>
                  <h1 className="font-bold">{`Titre du document : ${fileName}`}</h1>
               </CardHeader>
            )}
            <CardBody>
               <>
                  <Document
                     file={`/data/${fileName}`}
                     onItemClick={(): void => {}}
                     onLoadProgress={(): void => {}}
                     onLoadSuccess={(value: any): void =>
                        onDocumentLoadSuccess(value)
                     }
                     onPassword={(): void => {}}
                     onLoadError={onDocumentLoadError}
                     onSourceError={onDocumentLoadError}
                     loading="Chargement du pdf..."
                     error="Impossible de charger le pdf."
                  >
                     <Page
                        _enableRegisterUnregisterPage={false}
                        pageNumber={pageNumber}
                        error="Impossible de charger la page."
                        loading="Chargement de la page en cours..."
                        noData="Aucune page sélectionnée."
                        onLoadError={onDocumentLoadError}
                        onRenderError={onDocumentLoadError}
                        renderAnnotationLayer={false}
                        renderForms={false}
                        renderTextLayer={false}
                        height={900}
                        className="text-black"
                     />
                  </Document>
                  {isFileValid && (
                     <div className="flex flex-row justify-evenly p-4">
                        <Button
                           type="button"
                           variant="bordered"
                           isDisabled={pageNumber <= 1}
                           onClick={previousPage}
                        >
                           Page précédente
                        </Button>
                        <div className="flex flex-row justify-evenly pl-8 pr-8 w-[50%]">
                           <p>Page </p>
                           <Input
                              className="min-w-[50%] max-w-[50%] pl-4 pr-4"
                              type="number"
                              value={pageNumber.toString()}
                              onValueChange={(value: string): void => {
                                 setPageNumber(parseInt(value))
                              }}
                              min={1}
                              max={numPages}
                              placeholder="Numéro de page"
                           />
                           <p>sur {numPages || '--'}</p>
                        </div>
                        <Button
                           type="button"
                           variant="bordered"
                           isDisabled={pageNumber >= (numPages ?? 0)}
                           onClick={nextPage}
                        >
                           Page suivante
                        </Button>
                     </div>
                  )}
               </>
            </CardBody>
            {isFileValid && (
               <CardFooter className="pt-4 pb-4">
                  <h3 className="text-small">Sources :</h3>
                  <div className="flex flex-row">
                     {sources.map(
                        (
                           value: { name: string; link: string },
                           index: number
                        ) => {
                           return (
                              <div className="p-2" key={index}>
                                 <Link
                                    className="p-2"
                                    key={index}
                                    isBlock
                                    showAnchorIcon
                                    size="sm"
                                    color="foreground"
                                    href={value.link}
                                 >
                                    {value.name}
                                 </Link>
                              </div>
                           )
                        }
                     )}
                  </div>
               </CardFooter>
            )}
         </Card>
      </div>
   )
}
