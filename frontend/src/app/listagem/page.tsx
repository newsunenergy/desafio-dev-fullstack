"use client"

import { useGetLeads } from "@/src/hooks"
import { LeadsTable } from "./components"
import { Frown, Leaf, LeafIcon, Loader, Search } from "lucide-react"
import { useState } from "react"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"

export default function UsersPage() {

  const [searchBuffer, setSearchBuffer] = useState<string>('')
  const [search, setSearch] = useState<string>('')

  function onSearchBarChange(e: React.ChangeEvent<HTMLInputElement>)  {
    const value = e.target.value
    setSearchBuffer(value)
  }

  function onSearch() {
    setSearch(searchBuffer)
    refetch()
  }
  
  const {data: leads, isLoading, refetch} = useGetLeads(search)
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Input 
        className="md:w-1/2" 
        placeholder="fulanodetal@gmail.com" 
        onChange={onSearchBarChange} 
        onKeyUp={(e) => {
          const enterKey = e.key === 'Enter'
          if (enterKey) onSearch()
        }} />
        <Button onClick={onSearch}><Search /></Button>
      </div>
      <div className="rounded-md border">
        {leads?.length 
        ? <LeadsTable leads={leads}  /> 
        : isLoading 
        ? <Loader className="mx-auto animate-spin" /> 
        : <div className="p-4 flex gap-4 items-center justify-center"><h1>Nenhum lead encontrado... </h1><Frown /></div>}
      </div>
    </div>
  )
}

