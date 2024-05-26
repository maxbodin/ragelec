'use client'

import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Link } from '@nextui-org/link'

export default function Info() {
   return (
      <Card className="w-full min-h-[30vh] max-h-[40%] p-8">
         <CardHeader>
            <h1 className="font-bold">Bienvenue sur le Chatbot AI RagÉlec !</h1>
         </CardHeader>
         <CardBody>
            <ul className="list-disc list-inside">
               <li>
                  Il s'agit d'une application de chatbot IA open source
                  construit avec{' '}
                  <Link
                     isBlock
                     showAnchorIcon
                     size="sm"
                     color="foreground"
                     href="https://nextjs.org"
                  >
                     Next.js
                  </Link>{' '}
                  et l'API Inference de{' '}
                  <Link
                     isBlock
                     showAnchorIcon
                     size="sm"
                     color="foreground"
                     href="https://huggingface.co"
                  >
                     Hugging Face
                  </Link>
                  .
               </li>
               <li>
                  Ce Chatbot utilise les documents Séquélec pour vous répondre.
               </li>
               <li>
                  Vous avez accès aux documents utilisés pour vous répondre dans
                  l'explorateur de fichier à gauche.
               </li>
               <li>
                  Le Chatbot vous indique aussi précisément les documents
                  utilisés pour chaque réponse.
               </li>
            </ul>
         </CardBody>
         <CardFooter>
            <h2>Posez votre question dans l'espace dédié ci-dessous !</h2>
         </CardFooter>
      </Card>
   )
}
