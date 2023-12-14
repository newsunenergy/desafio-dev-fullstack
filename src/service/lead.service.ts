import { Injectable } from '@nestjs/common'
import { Lead } from '@prisma/client'
import axios from 'axios'
import { PrismaService } from 'src/infra/prisma/prisma.service'
import { FileDTO } from 'src/shared/dtos/file.dto'
import { LeadResponseDTO } from 'src/shared/dtos/lead-response.dto'
import { UserDataDTO } from 'src/shared/dtos/user-data.dto'
import { ConsumoService } from './consumo.service'
import { UnidadeService } from './unidade.service'
import { log } from 'console'

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
    this.validateLead(response.data, userData)
  }

  async validateLead(data: LeadResponseDTO, userData: UserDataDTO) {
    try {
      log('\n\npassou pelo submit', data, '\nuserData\n\n\n')
      const newLead: Lead = UserDataDTO.mapToLead(userData)
      const unidades = LeadResponseDTO.mapToUnidade(data)
      const listaConsumo = LeadResponseDTO.mapToConsumo(data)

      const leadResponse = await this.prisma.lead.create({ data: newLead })
      unidades.leadId = leadResponse.id
      const unidadesResponse = this.unidadeService.createUnidade(unidades)
      const consumoResponse =
        this.consumoService.createManyConsumo(listaConsumo)
      log(leadResponse, unidadesResponse, consumoResponse)
    } catch (erro) {
      log('\n\n\nocorreu um erro: ', erro, '\n\n\n\n')
    }
    return 'ok'
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
