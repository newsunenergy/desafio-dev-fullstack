import { useState } from "react"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useQuery } from "@tanstack/react-query"
import { Lead, Consumo } from "@/types/lead"
import apiClient from "@/src/services/api/apiClient.service"

interface ConsumoModal {
  consumoForaPontaEmKWH: number
  mesDoConsumo: string
}

export const useModalLeadDetails = (id: string) => {
  const [consume, setConsume] = useState<ConsumoModal[]>([])
  const [openConsume, setOpenConsume] = useState(false)

  const { data: leadsDetails } = useQuery({
    queryKey: ["leadsDetails", id],
    queryFn: async () => {
      const response = await apiClient.get(`/lead/${id}`)
      return response.data as Lead
    },
    enabled: Boolean(id),
  })

  const fields = [
    {
      name: "Nome:",
      value: leadsDetails?.nomeCompleto || "-",
    },
    {
      name: "Email:",
      value: leadsDetails?.email || "-",
    },
    {
      name: "Telefone:",
      value: leadsDetails?.telefone || "-",
    },
  ]

  const handleConsume = (consumeArr: Consumo[]) => {
    setConsume(() => {
      const newDate = consumeArr.map((item) => {
        const mesDoConsumo = format(new Date(item.mesDoConsumo), "MMMM", {
          locale: ptBR,
        })
        return {
          mesDoConsumo: mesDoConsumo,
          consumoForaPontaEmKWH: item.consumoForaPontaEmKWH,
        }
      })
      return newDate
    })
    setOpenConsume(true)
  }
  return {
    consume,
    openConsume,
    handleConsume,
    fields,
    leadsDetails,
    setOpenConsume,
  }
}
