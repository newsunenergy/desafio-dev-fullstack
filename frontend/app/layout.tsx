import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["500", "600"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "NewSun Leads",
  icons: [{ url: "pp-ico.png" }],
  description: "Site para simulação de compensação energética",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${poppins.variable}`}>
      <body className="bg-white text-gray-600">
        <main className="w-full">{children}</main>
      </body>
    </html>
  );
}
