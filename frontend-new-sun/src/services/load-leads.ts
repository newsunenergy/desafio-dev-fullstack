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

type LeadInfo = {
  name: string
  email: string
  phone: string
  unidades: DecodedBill[]
}

export const existentUnitsError = 'One ore more of the received units already exists in the database'
export const existentLeadError = 'The received Lead already exists in the database'

type Filters = {
  name?: string
  email?: string
  codigoDaUnidadeConsumidora?: string
}

export const loadLeads = async ({email, name, codigoDaUnidadeConsumidora}: Filters): Promise<LeadInfo[]> => {
    const res = await api.get<LeadInfo[]>(
      `/filtered-leads?${email ? 'email=' + email + '&' : ''}${name ? 'name=' + name + '&' : ''}${codigoDaUnidadeConsumidora ? 'codigoDaUnidadeConsumidora=' + codigoDaUnidadeConsumidora : ''}`)
    return res.data
}