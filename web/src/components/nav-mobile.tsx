import Link from 'next/link'
import { MenuIcon, X } from 'lucide-react'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
  DrawerHeader,
  DrawerDescription,
} from '@/components/ui/drawer'
import { docsConfig } from '@/config/docs'

export function NavMobile() {
  return (
    <div className="block md:hidden">
      <Drawer direction="right">
        <DrawerTrigger>
          <MenuIcon />
        </DrawerTrigger>
        <DrawerContent className="px-5 py-3">
          <DrawerHeader className="self-end flex border-b-2 border-slate-200 justify-between w-full items-center">
            <DrawerTitle>NewSun Energy Group</DrawerTitle>

            <DrawerClose>
              <span>
                <X className="size-8 fill-red-50" />
              </span>
            </DrawerClose>
          </DrawerHeader>

          <DrawerDescription className="sr-only">
            Este é o painel de navegação da NewSun Energy Group.
          </DrawerDescription>

          <nav className="mt-4">
            <ul>
              {docsConfig.mainNav.map(navItem => {
                return (
                  <li key={navItem.title}>
                    <Link
                      className="px-3 py-2 rounded-md flex items-center w-full gap-3 h-14 group hover:bg-violet-50 "
                      href={navItem.href}
                    >
                      {navItem.icon}

                      <span className="font-medium text-zinc-700 group-hover:text-newSun-gold   ">
                        {navItem.title}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <nav className="mt-auto mx-auto mb-4 w-full">
            <ul className="flex gap-3 w-full justify-evenly">
              {docsConfig.socialNav.map(navItem => {
                return (
                  <li key={navItem.title}>
                    <a
                      className="block rounded-full size-5"
                      href={navItem.href}
                    >
                      {navItem.icon}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
