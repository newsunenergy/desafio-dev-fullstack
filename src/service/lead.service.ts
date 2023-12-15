import { BadRequestException, Injectable } from '@nestjs/common'
import { Lead } from '@prisma/client'
import axios from 'axios'
import { PrismaService } from 'src/infra/prisma/prisma.service'
import { FileDTO } from 'src/shared/dtos/file.dto'
import { LeadResponseDTO } from 'src/shared/dtos/lead-response.dto'
import { UserDataDTO } from 'src/shared/dtos/user-data.dto'
import { ConsumoService } from './consumo.service'
import { UnidadeService } from './unidade.service'

@Injectable()
export class LeadService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly consumoService: ConsumoService,
    private readonly unidadeService: UnidadeService,
  ) {}
  async submitLead(file: File, userData: UserDataDTO) {
    const url = 'https://magic-pdf.solarium.newsun.energy/v1/magic-pdf'
    const fileFormData = FileDTO.mapToPdfFormData(file)
    const response = await axios.post(url, fileFormData, fileFormData)
    return this.validateLead(response.data, userData)
  }

  async validateLead(data: LeadResponseDTO, userData: UserDataDTO) {
    const newLead: Lead = UserDataDTO.mapToLead(userData)
    const unidades = LeadResponseDTO.mapToUnidade(data)
    const listaConsumo = LeadResponseDTO.mapToConsumo(data)

    const unit = await this.unidadeService.getByUnitKey(
      unidades.codigoDaUnidadeConsumidora,
    )
    if (unit !== null && unit.leadId !== null) {
      throw new BadRequestException(
        'Essa unidade já está cadastrada em nosso banco',
      )
    }
    if (listaConsumo.length != 12) {
      throw new BadRequestException(
        'O documento deve conter o histórico de consumo dos ultimos 12 meses!',
      )
    }
    try {
      const leadResponse = await this.prisma.lead.create({ data: newLead })
      unidades.leadId = leadResponse.id
      this.unidadeService.createUnidade(unidades)
      this.consumoService.createManyConsumo(listaConsumo)
      return leadResponse
    } catch (e: any) {
      throw new BadRequestException('Constraint error: ', e.meta)
    }
  }

  async getAllLeads() {
    return await this.prisma.lead.findMany({
      include: {
        unidades: {
          include: {
            historicoDeConsumoEmKWH: true,
          },
        },
      },
    })
  }

  async getBy(query) {
    const key = Object.keys(query)[0]
    const value = query[key]

    if (key.toUpperCase() === 'UNIDADE') {
      const unit = await this.unidadeService.getByUnitKey(value)
      const lead = await this.getById(unit.leadId)
      lead.unidades = []
      lead.unidades.push(unit)
      return lead
    }

    if (key.toUpperCase() === 'ID') {
      return this.getById(value)
    }

    try {
      return await this.prisma.lead.findMany({
        where: {
          [key]: {
            contains: value,
          },
        },
      })
    } catch (e: any) {
      return new BadRequestException(
        `Parametro não reconhecido: \n ${key}:${value}`,
        e,
      )
    }
  }

  async getById(id: string) {
    return await this.prisma.lead.findUnique({
      where: {
        id: id,
      },
      include: {
        unidades: {
          include: {
            historicoDeConsumoEmKWH: true,
          },
        },
      },
    })
  }
}
