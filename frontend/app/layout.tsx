import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NewSun Energy Challenge',
  description: 'Simulação de compensação energética',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <nav className="bg-blue-600 p-4 text-white">
          <div className="max-w-4xl mx-auto flex justify-center space-x-8">
            <a href="/simular" className="hover:underline">Simular</a>
            <a href="/listagem" className="hover:underline">Listagem</a>
          </div>
        </nav>
        <main className="p-8">{children}</main>
      </body>
    </html>
  );
}