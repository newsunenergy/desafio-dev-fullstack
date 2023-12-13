import { BadRequestException, Body, Injectable, Post } from '@nestjs/common'
import axios, { AxiosResponse } from 'axios'
import { LeadEntity } from 'src/core/domain/entities/lead.entity'
import { UserEntity } from 'src/core/domain/entities/user.entity'
import { PrismaService } from 'src/infra/prisma/prisma.service'
import { LeadFormRequest } from 'src/shared/dtos/lead-form-request.dto'
import { LeadResponse } from 'src/shared/dtos/lead-response.dto'
import { UserDTO } from 'src/shared/dtos/user.dto'
import { json } from 'stream/consumers'

@Injectable()
export class LeadService {
  constructor(private readonly prisma: PrismaService) {}
  async submitLead(data: any) {
    const url = 'https://magic-pdf.solarium.newsun.energy/v1/magic-pdf'

    axios
      .post(url, data)
      .then((response: AxiosResponse) => {
        this.validateLead(response)
      })
      .catch((error) => {
        // Se houver um erro na solicitação, ele será capturado aqui
        console.error('Erro na solicitação:', error)
      })
  }

  async validateLead(data: LeadResponse) {
    if (data.invoice.lenght < 12) {
      return new BadRequestException(
        'O documento deve conter o histórico de consumo dos ultimos 12 meses',
      )
    }
  }
  async getAllLead() {
    return
  }
}
