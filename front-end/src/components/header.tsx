import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export function Header() {
	return (
		<header className="flex justify-center items-center w-full py-5 border-b border-primary">
			<div className="w-full flex justify-between items-center max-w-[90%] md:max-w-2xl">
				<ModeToggle />
				<div className="flex items-center space-x-4">
					<Link
						href="/"
						className="text-sm hover:text-blue-600 font-medium transition"
					>
						Minhas Simulações
					</Link>
					<Link
						href="/create-simulate"
						className="text-sm hover:text-blue-600 font-medium transition"
					>
						Nova Simulação
					</Link>
				</div>
			</div>
		</header>
	);
}
