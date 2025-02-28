"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (type: "nome" | "email" | "codigoDaUnidade", term: string) => void; // Função para realizar a busca
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<
    "nome" | "email" | "codigoDaUnidade"
  >("nome");

  /*  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearch(value);
  }

  function handleSubmit() {
    onSearch(search);
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSubmit();
    }
  } */

  const handleSearch = () => {
    onSearch(searchType, searchTerm); // Chama a função de busca com o tipo e termo
  };

  return (
    <div className="min-w-[1000px] flex flex-row gap-2">
      <Input
        type="text"
        placeholder="Buscar Simulação por..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            {searchType === "nome" && "Nome"}
            {searchType === "email" && "Email"}
            {searchType === "codigoDaUnidade" && "Cod. Unidade"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-10 bg-white rounded-md p-3 text-[#303672]">
          <DropdownMenuItem onClick={() => setSearchType("nome")}>
            Nome
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSearchType("email")}>
            Email
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSearchType("codigoDaUnidade")}>
            Cod. Unidade
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button onClick={handleSearch}>Buscar</Button>
    </div>
  );
}
