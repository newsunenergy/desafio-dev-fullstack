"use client";

import ThreeLine from "hamburger-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { HiddenMenu } from "./HiddenMenu";

export function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 w-full left-0 right-0 z-50 px-4 py-4 bg-white border-b border-gray-200"
    >
      <div className="flex items-center justify-between w-full">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-sem-fundo.webp"
            alt="NewSun Energy"
            width={120}
            height={120}
            quality={100}
            priority
            className="h-16 w-16 object-contain"
            style={{ filter: "none" }}
          />
        </Link>
        <div className="flex gap-2 items-center justify-end relative z-50">
          {/* ThreeLine Menu */}
          <ThreeLine
            toggled={isOpen}
            toggle={setIsOpen}
            size={32}
            color={isOpen ? "#ffffff" : "#f97316"}
            duration={0.5}
          />
        </div>
      </div>
      {/* Fullscreen HiddenMenu */}
      <HiddenMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </nav>
  );
}
