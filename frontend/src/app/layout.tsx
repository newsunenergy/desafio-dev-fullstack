"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/src/lib/utils"
import { ThemeProvider } from "@/src/components/theme-provider"
import { Navigation } from "@/src/components/navigation"
import { Toaster } from "sonner"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "../contants"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={cn(inter.className, "min-h-screen bg-background antialiased")}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
            <div className="container mx-auto p-4">
              <Navigation />
              <main className="mt-6">{children}</main>
            </div>
            <Toaster richColors position="top-right" duration={2500} />
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}

