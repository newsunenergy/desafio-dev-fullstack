"use client";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navbarLinks } from "../_constants/navbar";
import { cn } from "../_lib/utils";

export const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky left-0 right-0 top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                alt="Logo NewSun Energy Brazil"
                src="/logo.webp"
                height={50}
                width={150}
              />
            </Link>
          </div>
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            {navbarLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "px-3 py-2 text-sm font-semibold transition-colors duration-200",
                  isActive(href)
                    ? "text-primary"
                    : "text-gray-500 hover:text-gray-800",
                )}
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 transition-colors duration-200 hover:text-primary"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="animate-fadeIn border border-t border-gray-100 sm:hidden">
          <div className="space-y-1 pb-3 pt-2">
            {navbarLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "block px-4 py-2.5 text-base font-semibold transition-colors duration-200",
                  isActive(href)
                    ? "text-primary"
                    : "text-gray-500 hover:text-gray-800",
                )}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
