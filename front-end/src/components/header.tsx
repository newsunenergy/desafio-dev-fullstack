"use client";

import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { usePathname } from "next/navigation";

export function Header() {
	const pathname = usePathname();

	return (
		<header className="flex justify-center items-center w-full py-5 border-b border-primary">
			<div className="w-full flex justify-between items-center max-w-[90%] md:max-w-2xl">
				<ModeToggle />
				<div className="flex items-center space-x-4">
					<Link
						href="/"
						className={`text-sm font-medium transition ${
							pathname === "/" && "text-blue-600"
						}`}
					>
						Minhas Simulações
					</Link>
					<Link
						href="/create-simulate"
						className={`text-sm font-medium transition ${
							pathname === "/create-simulate" && "text-blue-600"
						}`}
					>
						Nova Simulação
					</Link>
				</div>
			</div>
		</header>
	);
}
