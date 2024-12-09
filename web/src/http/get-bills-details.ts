interface BillDetailResponse {
  codigoDaUnidadeConsumidora: string
  enquadramento: string
  modeloFasico: string
  historicoDeConsumo: {
    consumoEmKWH: number
    mes: string
  }[]
}

export async function getBillsDetails(
  leadId: string
): Promise<BillDetailResponse[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/bills/${leadId}`
  )
  const data = await response.json()

  return data.billDetails
}
