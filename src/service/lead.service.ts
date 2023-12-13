import { BadRequestException, Injectable } from '@nestjs/common'
import axios, { AxiosResponse } from 'axios'
import { LeadEntity } from 'src/core/domain/entities/lead.entity'
import { PrismaService } from 'src/infra/prisma/prisma.service'
import { Lead } from '@prisma/client'
import { LeadFormRequest } from 'src/shared/dtos/lead-form-request.dto'
import { LeadDTO } from 'src/shared/dtos/lead-response.dto'

@Injectable()
export class LeadService {
  constructor(private readonly prisma: PrismaService) {}
  async submitLead(data: any) {
    const url = 'https://magic-pdf.solarium.newsun.energy/v1/magic-pdf'

    axios
      .post(url, data)
      .then((response: AxiosResponse) => {
        const lead = new LeadEntity()
        lead.email = data.email
        lead.nomeCompleto = data.nomeCompleto
        lead.telefone = data.telefone
        this.validateLead(response.data, lead)
      })
      .catch((error) => {
        // Se houver um erro na solicitação, ele será capturado aqui
        console.error('Erro na solicitação:', error)
      })
  }

  async validateLead(data: LeadDTO, lead: LeadEntity) {
    if (data.invoice.length < 12) {
      return new BadRequestException(
        'O documento deve conter o histórico de consumo dos ultimos 12 meses',
      )
    }

    const newLead = LeadDTO.mapFrom(data)
    newLead.email = lead.email
    newLead.nomeCompleto = lead.nomeCompleto
    newLead.telefone = lead.telefone
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
