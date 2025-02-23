import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/providers/theme-provider";

export const metadata: Metadata = {
	title: "NewSun Energy Brazil",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR" suppressHydrationWarning>
			<body className="antialiased">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Header />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
