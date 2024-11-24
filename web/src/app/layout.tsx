import type { Metadata } from 'next'
import { Plus_Jakarta_Sans as PlusJakartaSans, Poppins } from 'next/font/google'

import './globals.css'
import { cn } from '@/lib/utils'

const plusJakartaSans = PlusJakartaSans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Home | NewSun Energy Group',
  description:
    'Somos uma empresa com mais de 8 anos de mercado, referência em energia sustentável para condomínios, empresas e franquias.',
}

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    //suppressHydrationWarning
    //@see:https://github.com/vercel/next.js/discussions/72035
    <html lang="pt-BR">
      <body
        suppressHydrationWarning
        className={cn(
          `${plusJakartaSans.variable} ${poppins.variable} font-sans antialiased`
        )}
      >
        {children}
      </body>
    </html>
  )
}
