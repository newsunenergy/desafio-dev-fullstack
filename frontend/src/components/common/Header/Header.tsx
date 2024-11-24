"use client";

import Image from "next/image";
import React from "react";
import logo from "@/public/svgs/logo.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { general_routes } from "@/routes/general";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="relative w-full flex items-center">
      <Image src={logo} alt="logo" />
      <div className="absolute left-0 right-0 flex gap-2 w-fit mx-auto my-0">
        <Button
          className={`${
            pathname === general_routes.simulate
              ? "bg-boxColor"
              : "bg-transparent"
          } py-4 px-7 hover:bg-boxColor`}
          asChild
        >
          <Link href={general_routes.simulate}>Simular</Link>
        </Button>
        <Button
          className={`${
            pathname === general_routes.listing
              ? "bg-boxColor"
              : "bg-transparent"
          } hover:bg-[#1C1A2B] py-4 px-7`}
          asChild
        >
          <Link href={general_routes.listing}>Listagem</Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
