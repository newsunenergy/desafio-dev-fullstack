import React from "react"
import { Input } from "@/components/ui/input"
import filter from "@/public/svgs/filter.svg"
import Image from "next/image"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { FilterSimulationProps } from "./Typing"

const FilterSimulation = ({ filterValue, setFilterValue }: FilterSimulationProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFilterValue({ ...filterValue, [name]: value })
  }
  return (
    <div className="flex justify-start py-[10px] px-7 border-b border-textInput gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <div className="relative flex gap-2 bg-boxColor px-4 py-2 rounded-lg cursor-pointer text-white">
            <span className="text-sm">Filtros</span>
            <Image src={filter} alt="filtro" />{" "}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-box text-white border-textInput">
          <div className="grid gap-4">
            <h4 className="font-medium leading-none text-black">Filtros</h4>

            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label className="text-[#646272] font-bold">Nome</Label>
                <Input
                  name="name"
                  className="col-span-2 h-8 text-black"
                  placeholder="John Doe"
                  value={filterValue.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label className="text-[#646272] font-bold">Email</Label>
                <Input
                  name="email"
                  className="col-span-2 h-8  text-black"
                  placeholder="email@email.com"
                  value={filterValue.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label className="text-[#646272] font-bold">Código</Label>
                <Input
                  name="code"
                  className="col-span-2 h-8 text-black"
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
  )
}

export default FilterSimulation
