import { CreateToastFnReturn } from '@chakra-ui/react'
import axios from 'axios'

export async function uploadToMagicPdf(
    files: File[],
    toast: CreateToastFnReturn,
) {
    const url = 'https://magic-pdf.solarium.newsun.energy/v1/magic-pdf'
    const formData = new FormData()

    const response = await Promise.all(
        [...files].map(async (file) => {
            formData.set('file', file)
            const uploadResponse = await axios
                .post<ResponseData>(url, formData)
                .catch(() => {
                    toast({
                        description: `Não foi possível enviar a conta "${file.name}"`,
                        status: 'error',
                    })
                })

            if (!uploadResponse) return

            return {
                codigoDaUnidadeConsumidora: uploadResponse.data.unit_key,
                modeloFasico: uploadResponse.data.phaseModel,
                enquadramento: uploadResponse.data.chargingModel,
                consumoEmReais: uploadResponse.data.valor,
                historicoDeConsumoEmKWH: uploadResponse.data.invoice.map(
                    (invoice) => ({
                        consumoForaPontaEmKWH: invoice.consumo_fp,
                        mesDoConsumo: invoice.consumo_date,
                    }),
                ),
            }
        }),
    )

    return response
}

type ResponseData = {
    valor: number
    barcode: string
    chargingModel: string
    phaseModel: string
    unit_key: string
    invoice: Consumo[]
    energy_company_id: string
}

type Consumo = {
    consumo_fp: number
    consumo_date: string
}
