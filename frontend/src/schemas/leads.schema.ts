import { z } from "zod"

const ACCEPTED_MIME_TYPES = ["application/pdf"]
const ACCEPTED_FILE_EXTENSIONS = [".pdf"]

const pdfFileSchema = z.custom<File>((file) => {
  if (!(file instanceof File)) {
    return false
  }


  if (!ACCEPTED_MIME_TYPES.includes(file.type)) {
    return false
  }

  const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`
  if (!ACCEPTED_FILE_EXTENSIONS.includes(fileExtension)) {
    return false
  }

  return true
}, "O arquivo deve ser um PDF válido")

export const leadFormSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(14, "Telefone inválido").max(15, "Telefone inválido"),
  files: z.array(pdfFileSchema).min(1, "Selecione pelo menos um arquivo PDF"),
})

export type LeadFormData = z.infer<typeof leadFormSchema>

export type Lead = {
  id: string,
  nomeCompleto: string,
  email: string,
  telefone: string,
}

export type Unidade = {
  id: string,
  codigoDaUnidadeConsumidora: string,
  modeloFasico: string,
  consumoEmReais: number,
  enquadramento: string,
  leadId: string,
}

export type Consumo = {
  id: string,
  consumoForaPontaEmKWH: number,
  mesDoConsumo: string,
  unidadeId: string,
}


export type FullLead= Lead & {
  unidades: (Unidade & {
    historicoDeConsumoEmKWH: Consumo[],
  })[],
}

