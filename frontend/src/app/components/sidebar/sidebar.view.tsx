"use client";

import { useState } from "react";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { FiRefreshCw, FiUsers } from "react-icons/fi";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex">
      <button
        className="md:hidden p-4 fixed top-4 left-4 z-50 bg-white rounded-full shadow-lg"
        onClick={() => setIsSidebarOpen(true)}
      >
        <AiOutlineMenu className="w-6 h-6 text-gray-900" />
      </button>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-64 bg-gray-900 text-white p-6 shadow-lg transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}>
        <button
          className="md:hidden text-white absolute top-4 right-4"
          onClick={() => setIsSidebarOpen(false)}
        >
          <IoMdClose className="w-6 h-6" />
        </button>

        <h2 className="text-lg font-semibold mb-4">Menu</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/listagem" className="flex items-center gap-2 hover:text-gray-300">
            <FiUsers className="w-5 h-5" />
            Lista de Clientes
          </Link>

          <Link href="/simular" className="flex items-center gap-2 hover:text-gray-300">
            <FiRefreshCw className="w-5 h-5" />
            Simular Cliente
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-6 md:ml-64">{children}</main>
    </div>
  );
}
