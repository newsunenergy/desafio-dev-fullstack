import Link from "next/link";
import { Button } from "./_components/ui/button";
import { Card } from "./_components/ui/card";

export default function Home() {
  return (
    <div className="mx-auto mt-8 max-w-4xl space-y-8">
      <h1 className="text-center text-2xl font-medium text-[#1e1e1e] md:text-4xl">
        Descubra o potencial de economia de energia! <br /> Faça uma simulação
        gratuita conosco.
      </h1>
      <div className="mx-auto grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card className="border-orange-100 bg-gradient-to-br from-white to-orange-50 p-8 hover:shadow-xl">
          <div className="flex h-full flex-col space-y-4">
            <h2 className="text-center text-2xl font-semibold text-blue-900">
              Nova Simulação
            </h2>
            <p className="flex-grow text-gray-600">
              Realize uma nova simulação de compensação energética e descubra
              seu potencial de economia. Processo rápido e sem compromisso.
            </p>
            <Link href="/simular" className="mt-auto">
              <Button>Iniciar Simulação</Button>
            </Link>
          </div>
        </Card>
        <Card className="border-blue-100 bg-gradient-to-br from-white to-blue-50 p-8 hover:shadow-xl">
          <div className="flex h-full flex-col space-y-4">
            <h2 className="text-center text-2xl font-semibold text-blue-900">
              Simulações Realizadas
            </h2>
            <p className="flex-grow text-gray-600">
              Visualize e gerencie todas as simulações cadastradas em nossa
              plataforma. Acompanhe o status de cada solicitação.
            </p>
            <Link href="/listagem" className="mt-auto">
              <Button variant="secondary">Ver Simulações</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
