"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);

  const router = useRouter();
  const haveSearch = useSearchParams().get("q");

  const handleSearch = () => {
    if (searchValue) router.push(`/listagem?q=${searchValue}`);
  };

  const cleanSearch = () => {
    router.push("/listagem");
    setSearchValue("");
  };

  return (
    <div className="flex mb-4">
      {haveSearch ? (
        <div className="flex items-center gap-4 text-sm">
          <p>Filtro: {haveSearch}</p>
          <Button variant="ghost" onClick={cleanSearch}>
            Limpar
          </Button>
        </div>
      ) : null}
      <div className="flex gap-4 items-center ml-[auto]">
        <Input
          onChange={({ target }) => setSearchValue(target.value)}
          type="search"
          placeholder="Pesquisar"
          className="w-[200px]"
          value={searchValue}
        />
        <Button type="submit" onClick={handleSearch}>
          Pesquisar
        </Button>
      </div>
    </div>
  );
};

export default SearchInput;
