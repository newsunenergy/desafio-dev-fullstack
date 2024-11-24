import React from "react";
import { Input } from "@/components/ui/input";
import filter from "@/public/svgs/filter.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FilterSimulationProps } from "./Typing";

const FilterSimulation = ({
  filterValue,
  setFilterValue,
}: FilterSimulationProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterValue({ ...filterValue, [name]: value });
  };
  const hasFilterValues = Object.values(filterValue).some(
    (value) => value.trim() !== "",
  );
  return (
    <div className="flex justify-end py-[10px] px-7 border-b border-textInput">
      <Popover>
        <PopoverTrigger asChild>
          <div className="relative bg-boxColor p-3 rounded-lg cursor-pointer">
            <Image src={filter} alt="filtro" />{" "}
            {hasFilterValues && (
              <div className="absolute bottom-0 left-[10px] w-[20px] h-[2.5px] rounded  bg-[#8D7AFF]"></div>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-box text-white border-textInput">
          <div className="grid gap-4">
            <h4 className="font-medium leading-none">Filtros</h4>

            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label className="text-[#646272] font-bold">Nome</Label>
                <Input
                  name="name"
                  className="col-span-2 h-8"
                  placeholder="Matheus"
                  value={filterValue.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label className="text-[#646272] font-bold">Email</Label>
                <Input
                  name="email"
                  className="col-span-2 h-8"
                  placeholder="matheus@gmail.com"
                  value={filterValue.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label className="text-[#646272] font-bold">Código</Label>
                <Input
                  name="code"
                  className="col-span-2 h-8"
                  placeholder="123456"
                  value={filterValue.code}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FilterSimulation;
