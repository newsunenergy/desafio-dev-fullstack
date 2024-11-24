import axios from 'axios'
import FormData from 'form-data'
import { saveSimulationData } from './save-simulation-data'

interface registerSimulationRequest {
  name: string
  email: string
  telefone: string
  bills: Buffer[]
}

export async function registerSimulation({
  name,
  email,
  telefone,
  bills,
}: registerSimulationRequest) {
  try {
    if (bills && bills.length > 0) {
      const form = new FormData()

      bills.forEach((bill, index) => {
        form.append('file', bill, {
          filename: `bill_${index + 1}.jpg`,
          contentType: 'image/jpeg',
        })
      })

      const response = await axios.post(
        'https://magic-pdf.solarium.newsun.energy/v1/magic-pdf',
        form,
        {
          headers: {
            ...form.getHeaders(),
          },
        }
      )

      if (!response.data || response.data.error) {
        console.error('Erro ao processar os arquivos com a API externa.')
        return
      }

      const leadData = {
        nomeCompleto: name,
        email: email,
        telefone: telefone,
      }

      await saveSimulationData(leadData, response.data)
    } else {
      console.log('Nenhum arquivo encontrado para enviar.')
    }
  } catch (error) {
    console.error('Erro ao enviar os arquivos para a API:', error)
    throw error
  }
}
