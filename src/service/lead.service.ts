import { Injectable } from '@nestjs/common'
import axios, { AxiosResponse } from 'axios'
import FormData from 'form-data'
import { PrismaService } from 'src/infra/prisma/prisma.service'
import { LeadResponseDTO } from 'src/shared/dtos/lead-response.dto'
import { UserDataDTO } from 'src/shared/dtos/user-data.dto'

@Injectable()
export class LeadService {
  constructor(private readonly prisma: PrismaService) {}
  async submitLead(data: FormData, userData: UserDataDTO) {
    const url = 'https://magic-pdf.solarium.newsun.energy/v1/magic-pdf'

    axios
      .post(url, data, {
        headers: data.getHeaders(),
      })
      .then((response: AxiosResponse) => {
        console.log(response.data)
        this.validateLead(response.data, userData)
      })
      .catch((error) => {
        // Se houver um erro na solicitação, ele será capturado aqui
        console.error('Erro na solicitação:', error)
      })
  }

  async validateLead(data: LeadResponseDTO, userData: UserDataDTO) {
    const newLead = userData.mapToLead()
    return await this.prisma.lead.create({
      data: newLead,
    })
  }

  async getAllLeads() {
    return await this.prisma.lead.findMany()
  }

  async getById(id: string) {
    return await this.prisma.lead.findUnique({
      where: {
        id: id,
      },
    })
  }
}
