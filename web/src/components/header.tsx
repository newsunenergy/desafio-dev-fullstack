import Image from 'next/image'
import Link from 'next/link'

import logoNewBlue from '@/assets/logo-new-blue.webp'
import { NavLink } from '@/components/nav-link'
import { NavMobile } from '@/components/nav-mobile'
import { docsConfig } from '@/config/docs'

export function Header() {
  return (
    <header className="w-full p-3  border-b-2 border-slate-200">
      <div className="flex max-w-7xl mx-auto justify-between items-center">
        <div className="w-[150px]">
          <Link href="/">
            <Image src={logoNewBlue} alt="newsun" width={255} height={78} />
          </Link>
        </div>

        <nav className="hidden md:block">
          <ul className="flex gap-10 text-[#6b7280] font-medium">
            {docsConfig.mainNav.map(navItem => {
              return (
                <li key={navItem.title}>
                  <NavLink
                    className="block transition-all p-0.5 data-[current=true]:text-newSun-gold hover:text-newSun-gold"
                    href={navItem.href}
                  >
                    {navItem.title}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>

        <nav className="hidden md:block">
          <ul className="flex gap-3">
            {docsConfig.socialNav.map(navItem => {
              return (
                <li className="group" key={navItem.title}>
                  <a className="block rounded-full size-5" href={navItem.href}>
                    {navItem.icon}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <NavMobile />
      </div>
    </header>
  )
}
