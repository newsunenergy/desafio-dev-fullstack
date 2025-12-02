import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NewSun Energy - Simulação',
  description: 'Simulação de compensação energética',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen">
        <header className="bg-blue-700 text-white p-6 text-center">
          <h1 className="text-3xl font-bold">NewSun Energy Brasil</h1>
          <p className="mt-2">Simulação de Compensação Energética</p>
        </header>
        <nav className="bg-blue-600 p-4">
          <div className="max-w-6xl mx-auto flex gap-8 justify-center">
            <a href="/simular" className="text-white font-medium hover:underline">Simular</a>
            <a href="/listagem" className="text-white font-medium hover:underline">Minhas Simulações</a>
          </div>
        </nav>
        <main className="max-w-6xl mx-auto p-8">
          {children}
        </main>
      </body>
    </html>
  )
}