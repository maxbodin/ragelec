import {
   Navbar,
   NavbarBrand,
   NavbarContent,
   NavbarItem,
} from '@nextui-org/navbar'
import Link from 'next/link'
import { Button } from '@nextui-org/button'
import { GithubIcon } from '@/app/icons/githubIcon'
import { Tooltip } from '@nextui-org/tooltip'

export default function AppNavBar() {
   return (
      <Navbar>
         <NavbarBrand>
            <h1 className="font-bold text-inherit">RagÉlec ⚡</h1>
         </NavbarBrand>
         <NavbarContent
            className="hidden sm:flex gap-4"
            justify="center"
         ></NavbarContent>
         <NavbarContent justify="end">
            <NavbarItem>
               <Tooltip
                  content="Voir le projet !"
                  delay={0}
                  closeDelay={0}
                  motionProps={{
                     variants: {
                        exit: {
                           opacity: 0,
                           transition: {
                              duration: 0.1,
                              ease: 'easeIn',
                           },
                        },
                        enter: {
                           opacity: 1,
                           transition: {
                              duration: 0.15,
                              ease: 'easeOut',
                           },
                        },
                     },
                  }}
               >
                  <Button
                     as={Link}
                     target="_blank"
                     rel="noopener noreferrer"
                     href="https://github.com/maxbodin/ragelec"
                     color="default"
                     variant="bordered"
                     startContent={<GithubIcon />}
                  >
                     GitHub
                  </Button>
               </Tooltip>
            </NavbarItem>
         </NavbarContent>
      </Navbar>
   )
}
