import type { ReactElement } from 'react'
import { Calculator, House, List } from 'lucide-react'

import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from '@/components/icons'

export interface MainNavItem {
  title: string
  href: string
  icon?: ReactElement
}
export interface SocialNavItem {
  title: string
  href: string
  icon?: ReactElement
}

interface DocsConfig {
  mainNav: MainNavItem[]
  socialNav: SocialNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: 'Home',
      href: '/',
      icon: <House />,
    },
    {
      title: 'Simular',
      href: '/simular',
      icon: <Calculator />,
    },
    {
      title: 'Listagem',
      href: '/listagem',
      icon: <List />,
    },
  ],

  socialNav: [
    {
      title: 'Facebook',
      href: 'https://www.facebook.com/people/NewSun-Energy-Group/61559902612064/',
      icon: <FacebookIcon />,
    },
    {
      title: 'Instagram',
      href: 'https://www.instagram.com/newsunenergygroup/',
      icon: <InstagramIcon />,
    },
    {
      title: 'Linkedin',
      href: 'https://www.linkedin.com/company/newsun-energy-group',
      icon: <LinkedinIcon />,
    },
    {
      title: 'Youtube',
      href: 'https://www.youtube.com/channel/UCWvJ-BkxYiZBGVwHH_aQf7w',
      icon: <YoutubeIcon />,
    },
  ],
}
