import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl md:text-4xl font-bold mb-8">
        Sistema de Simulação Energética
      </h1>
      <div className="space-x-4">
        <Link
          href={"/simular"}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Nova Simulação
        </Link>
        <Link
          href={"/listagem"}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Listar Simulações
        </Link>
      </div>
    </div>
  );
}
