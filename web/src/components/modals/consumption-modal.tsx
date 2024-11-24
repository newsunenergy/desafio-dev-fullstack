import { BadgeInfo } from 'lucide-react'
import dayjs from 'dayjs'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useEffect, useState } from 'react'
import { getBillsDetails } from '@/http/get-bills-details'
import { HTTPError } from 'ky'
import { ListSkeleton } from '../list-skeleton'

interface ConsumptionModalProps {
  leadId: string
}

type BillsInterface = {
  codigoDaUnidadeConsumidora: string
  enquadramento: string
  modeloFasico: string
  historicoDeConsumo: {
    consumoEmKWH: number
    mes: string
  }[]
}

export function ConsumptionModal({ leadId }: ConsumptionModalProps) {
  const [bills, setBills] = useState<BillsInterface[]>([])
  const [isBillsLoading, setIsBillsLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchBills() {
      setIsBillsLoading(true)
      try {
        const response = await getBillsDetails(leadId)

        setBills(response)
      } catch (error) {
        if (error instanceof HTTPError) {
          const { mensagem } = await error.response.json()
          console.error(mensagem)

          return { success: false, message: mensagem, errors: null }
        }

        return {
          success: false,
          message: 'Erro inesperado, tente novamente dentro de alguns minutos',
          errors: null,
        }
      } finally {
        setIsBillsLoading(false)
      }
    }

    fetchBills()
  }, [leadId])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <span className="flex items-center gap-1 text-blue-500">
            <BadgeInfo size={14} />
            Detalhes
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-slate-200">
        <DialogHeader>
          <DialogTitle className="mt-5 text-center text-2xl font-bold">
            Detalhes da Conta
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Modal com os dados da conta
        </DialogDescription>

        <div>
          {isBillsLoading ? (
            <>
              <ListSkeleton />
              <ListSkeleton />
              <ListSkeleton />
              <ListSkeleton />
            </>
          ) : bills.length > 0 ? (
            bills.map(bill => {
              return (
                <div key={bill.codigoDaUnidadeConsumidora}>
                  <div>
                    <p>
                      <span className="font-bold">
                        Código da Unidade Consumidora:{' '}
                      </span>
                      {bill.codigoDaUnidadeConsumidora}
                    </p>
                    <p>
                      <span className="font-bold">Enquadramento: </span>
                      {bill.enquadramento}
                    </p>

                    <p>
                      <span className="font-bold">Modelo fásico: </span>
                      {bill.modeloFasico}
                    </p>
                  </div>

                  <div className="w-full mt-4">
                    <p className="font-bold">Histórico de Consumo (kWh)</p>

                    {bill.historicoDeConsumo.map(consumo => {
                      const formattedDate = dayjs(consumo.mes).format('MM/YYYY')
                      return (
                        <div
                          key={consumo.consumoEmKWH}
                          className="w-full flex justify-between mt-4"
                        >
                          <span>{formattedDate}</span>
                          <span>{consumo.consumoEmKWH} kWh</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })
          ) : (
            <p>nao</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
