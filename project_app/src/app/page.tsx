"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function HomePage() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="flex flex-col text-center my-32">
        <h1 className="text-4xl font-bold mb-8">Simulação de</h1>
        <h1 className="text-4xl font-bold mb-8">
          Compensação Energética <span className="text-[#2F306D]">New</span>
          <span className="text-[#F87F2C]">Sun</span>
        </h1>
        <p className="text-[#2F306D]">
          Clique em um dos botões abaixo para simular ou visualizar a lista de
          simulações
        </p>
        <p className="text-[#2F306D]">Ou acesse pelo menu de navegação</p>
      </div>
      <div className="flex gap-4">
        <Link href="/simular" passHref>
          <Button className="px-6 py-3 text-lg">Nova Simulação</Button>
        </Link>

        <Link href="/listagem" passHref>
          <Button className="px-6 py-3 text-lg">Ver Listagem</Button>
        </Link>
      </div>
    </div>
  );
}
