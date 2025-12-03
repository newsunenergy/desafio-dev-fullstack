import Link from "next/link";

interface HiddenMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function HiddenMenu({ isOpen, setIsOpen }: HiddenMenuProps) {
  return (
    <div
      className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-blue-600 transition-transform duration-500 ease-in-out ${
        isOpen ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <ul className="flex flex-col gap-8 text-center">
        <li>
          <Link
            href="/simular"
            onClick={() => setIsOpen(false)}
            className="font-semibold text-lg text-white transition-all duration-300 hover:text-orange-400 inline-block"
          >
            + Nova
          </Link>
        </li>
        <li>
          <Link
            href="/listagem"
            onClick={() => setIsOpen(false)}
            className="font-semibold text-lg text-white transition-all duration-300 hover:text-orange-400 inline-block"
          >
            Simulações
          </Link>
        </li>
      </ul>
    </div>
  );
}
