import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/toaster'

type AppLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default async function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Header />

      <Toaster />
      {children}
      <Footer />
    </>
  )
}
