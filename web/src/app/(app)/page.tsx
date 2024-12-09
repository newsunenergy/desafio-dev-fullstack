import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <div className="mb-10 w-full px-6 mt-8">
        <section className="mx-auto max-w-app items-center px-10 pt-10">
          <h1 className="text-center text-xl font-bold uppercase    lg:text-[2rem]">
            Descubra o quanto você pode{' '}
            <span className="relative !z-[10] text-orange-600">economizar</span>
          </h1>
          <p className="text-center mt-1">
            Siga o passo a passo abaixo para simular a sua nova conta de luz
          </p>

          <div className="flex flex-col mx-auto max-w-64 gap-5 mt-20">
            <Button variant="newSun" asChild>
              <Link href={'/simular'}>Nova Simulação</Link>
            </Button>
            <Button variant="newSun">
              <Link href={'/listagem'}>Listar Simulações</Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  )
}
