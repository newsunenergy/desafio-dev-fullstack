"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/src/lib/utils"

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="flex gap-4 border-b pb-4">
      <Link
        href="/"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Formulário
      </Link>
      <Link
        href="/users"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/users" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Usuários
      </Link>
    </nav>
  )
}

