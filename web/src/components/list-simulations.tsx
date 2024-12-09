'use client'

import { useEffect, useState } from 'react'
import { ListSkeleton } from './list-skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { getSimulations } from '@/http/get-simulations'
import { ConsumptionModal } from './modals/consumption-modal'
import { Input } from './ui/input'

type Simulation = {
  lead: {
    id: string
    nomeCompleto: string
    email: string
    telefone: string
  }
  codigoDaUnidadeConsumidora: string
}
export function ListSimulations() {
  const [simulations, setSimulations] = useState<Simulation[]>([])
  const [filterValue, setFilterValue] = useState<string>('')
  const [filterField, setFilterField] = useState<string>('nome')

  const handleFilterValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterValue(event.target.value)
  }

  const handleFilterFieldChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterField(event.target.value)
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      async function fetchSimulations() {
        setIsLoading(true)
        try {
          const response = await getSimulations(filterField, filterValue)
          setSimulations(response)
        } catch (error) {
          console.error('Erro ao buscar simulações:', error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchSimulations()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [filterField, filterValue])

  const [isLoading, setIsLoading] = useState<boolean>(true)
  return (
    <>
      <div className="flex mx-auto max-w-96 gap-4 mb-8">
        <select
          className="ml-2 max-w-36"
          value={filterField}
          onChange={handleFilterFieldChange}
        >
          <option value="nome">Nome</option>
          <option value="email">Email</option>
          <option value="codigoDaUnidadeConsumidora">Código</option>
        </select>
        <Input
          className=" w-[300px] "
          placeholder={`Filtrar por ${filterField === 'codigoDaUnidadeConsumidora' ? 'Código' : filterField}`}
          value={filterValue}
          onChange={handleFilterValueChange}
        />
      </div>

      <Table className="max-w-[1050px] mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Código Unidade</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <>
              <ListSkeleton />
              <ListSkeleton />
              <ListSkeleton />
              <ListSkeleton />
            </>
          ) : (
            <>
              {simulations.length > 0 ? (
                simulations.map((simulation, i) => (
                  <TableRow key={`${i}-${simulation.lead.nomeCompleto}`}>
                    <TableCell>{simulation.lead.nomeCompleto}</TableCell>
                    <TableCell>{simulation.lead.email}</TableCell>
                    <TableCell>{simulation.lead.telefone}</TableCell>
                    <TableCell>
                      {simulation.codigoDaUnidadeConsumidora}
                    </TableCell>

                    <TableCell className="flex justify-end gap-2">
                      <ConsumptionModal leadId={simulation.lead.id} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Nada para listar
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
        </TableBody>
      </Table>
    </>
  )
}
