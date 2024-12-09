import { ListSimulations } from '@/components/list-simulations'

export default function listagemPage() {
  return (
    <div className="py-10 px-3">
      <main className="mx-auto w-full max-w-[1200px]">
        <h1 className="text-2xl font-bold pb-10">Verificar registros</h1>
      </main>

      <ListSimulations />
    </div>
  )
}
