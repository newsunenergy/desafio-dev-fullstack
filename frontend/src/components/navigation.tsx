"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/src/lib/utils"

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="flex gap-4 border-b pb-4">
      <Link
        href="/simular"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/simular" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Simular
      </Link>
      <Link
        href="/listagem"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/listagem" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Leads
      </Link>
    </nav>
  )
}

