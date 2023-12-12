import { HttpService } from '@nestjs/axios'
import { Body, Injectable, Post } from '@nestjs/common'
import { LeadEntity } from 'src/core/domain/entities/lead.entity'
import { UserEntity } from 'src/core/domain/entities/user.entity'
import { PrismaService } from 'src/infra/prisma/prisma.service'
import { LeadFormRequest } from 'src/shared/dtos/lead-form-request.dto'
import { UserDTO } from 'src/shared/dtos/user.dto'

@Injectable()
export class LeadService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}
  async submitLead(data: FormData) {
    const url = 'https://magic-pdf.solarium.newsun.energy/v1/magic-pdf'
    const response = this.httpService.post(url, data)
    return response
  }
}
