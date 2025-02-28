import type { Metadata } from "next";
import { Geist, Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "@/_components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Simulador de Compensacao Energetica NewSun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${poppins.variable} antialiased`}>
        <NavBar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
