import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Header from "@/components/common/Header/Header";
import Provider from "@/utils/Provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NewSun",
  description:
    "Simule e otimize a compensação energética das suas unidades consumidoras com facilidade e precisão.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${inter.className}`}>
        <Header />
        <main className="flex justify-center items-center h-full">
          {" "}
          <Provider>{children}</Provider>
        </main>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
