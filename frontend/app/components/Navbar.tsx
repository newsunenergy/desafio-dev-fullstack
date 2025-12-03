import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-sem-fundo.webp"
            alt="NewSun Energy"
            width={120}
            height={120}
            quality={100}
            priority
            className="h-28 w-28 object-contain"
            style={{ filter: "none" }}
          />
        </Link>

        {/* Botões à direita */}
        <div className="flex items-center gap-3">
          <Link
            href="/simular"
            className="inline-flex items-center justify-center rounded-md bg-linear-to-r from-orange-400 to-orange-500 px-4 py-2 text-sm font-medium text-white hover:from-orange-500 hover:to-orange-600 transition-all"
          >
            <span className="mr-1">+</span> Nova
          </Link>
          <Link
            href="/listagem"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
          >
            Simulações
          </Link>
        </div>
      </div>
    </nav>
  );
}
