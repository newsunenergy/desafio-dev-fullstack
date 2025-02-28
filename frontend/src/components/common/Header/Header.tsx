"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { general_routes } from "@/routes/general"
import { cn } from "@/src/lib/utils"

const Header = () => {
  const pathname = usePathname()

  return (
    <header className="relative w-full flex items-center">
      <div className="absolute left-0 right-0 flex gap-2 w-fit mx-auto my-0 max-[730px]:top-14">
        <Button
          className={cn(
            "bg-transparent py-4 px-7 hover:bg-boxColor text-black hover:text-white",
            {
              "bg-boxColor text-white": pathname === general_routes.simulate,
            }
          )}
          asChild
        >
          <Link href={general_routes.simulate}>Simular</Link>
        </Button>
        <Button
          className={cn(
            "bg-transparent py-4 px-7 hover:bg-boxColor  text-black hover:text-white",
            {
              "bg-boxColor text-white": pathname === general_routes.listing,
            }
          )}
          asChild
        >
          <Link href={general_routes.listing}>Listagem</Link>
        </Button>
      </div>
    </header>
  )
}

export default Header
