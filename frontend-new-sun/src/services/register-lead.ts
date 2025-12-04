import { AxiosError } from "axios"
import { api } from "./api"

type Invoice = {
  consumoForaPontaEmKWH: number
  mesDoConsumo: Date
}

type DecodedBill = {
  enquadramento: string,
  modeloFasico: string,
  codigoDaUnidadeConsumidora: string,
  consumoEmReais: number
  historicoDeConsumoEmKWH: Invoice[],
}

export type LeadInfo = {
  name: string
  email: string
  phone: string
  unidades: DecodedBill[]
}

export const existentUnitsError = 'One ore more of the received units already exists in the database'
export const existentLeadError = 'The received Lead already exists in the database'

export const registerLead = async (leadInfo: LeadInfo): Promise<number | string> => {
  try {
    const res = await api.post(
      '/lead',
      leadInfo)
    return res.status
  } catch (err) {
    const error = err as AxiosError<{error: string}>
    const errorMessage = error.response?.data?.error
    
    return errorMessage ?? 'Houve um erro inesperado'
  }
}