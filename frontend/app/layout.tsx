import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar, MobileNavbar } from "./components";
import { Providers } from "./providers";

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
      <body className="bg-gray-50 text-gray-600">
        <Providers>
          <div className="hidden md:block">
            <Navbar />
          </div>
          <div className="md:hidden">
            <MobileNavbar />
          </div>
          <main className="w-full md:pt-0 pt-20">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
