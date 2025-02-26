import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  PreconditionFailedException,
} from '@nestjs/common'
import { LeadCreationDto, LeadsGetDto } from './dtos/leads.dto'
import { LeadsContract } from 'src/repositories/leads/leads.contract'
import { UnidadesContract } from 'src/repositories/unidades/unidades.contract'
import { ConsumosContract } from 'src/repositories/consumos/consumos.contract'
import { AccountAnalyserService } from 'src/providers'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { Prisma } from '@prisma/client'

@Injectable()
export class LeadsService {
  constructor(
    private readonly leadsRepository: LeadsContract,
    private readonly unidadesRepository: UnidadesContract,
    private readonly consumosRepository: ConsumosContract,
    private readonly accountAnalyser: AccountAnalyserService,
  ) {}

  async getLeadById(id: string) {
    return this.leadsRepository.findLeadByIdWithIncludes({
      id,
      include: {
        unidades: {
          include: {
            historicoDeConsumoEmKWH: true,
          },
        },
      },
    })
  }

  async getLeads({ email, limit, page, unit_code }: LeadsGetDto) {
    const where = {} as Prisma.LeadWhereInput

    if (email) {
      where['email'] = {
        contains: email,
      }
    }

    if (unit_code) {
      where['unidades'] = {
        some: {
          codigoDaUnidadeConsumidora: unit_code,
        },
      }
    }

    page = page - 1

    const total = await this.leadsRepository.countLeads({ where })
    const pages = Math.ceil(total / limit)

    const skip = page * limit

    const hasNext = page + 1 < pages
    const nextPage = hasNext ? page + 2 : null

    const results = await this.leadsRepository.findLeads({
      skip,
      take: limit,
      where,
      include: {
        unidades: {
          include: {
            historicoDeConsumoEmKWH: true,
          },
        },
      },
    })

    return {
      paging: {
        page: page + 1,
        total,
        pages,
        nextPage,
      },
      results,
    }
  }

  async createLead(body: LeadCreationDto, files: Express.Multer.File[]) {
    const analysedFiles = await this.accountAnalyser.analyseAccounts(files)

    const duplicatedUnitKeys = analysedFiles
      .map((file) => file.unit_key)
      .filter((unitKey, index, self) => self.indexOf(unitKey) !== index)

    if (duplicatedUnitKeys.length) {
      throw new PreconditionFailedException(
        `Chave de unidades duplicadas: ${duplicatedUnitKeys.join(', ')}.`,
      )
    }

    const lead = await this.leadsRepository
      .createLead({
        data: {
          email: body.email,
          nomeCompleto: body.name,
          telefone: body.phone,
        },
      })
      .catch((error: PrismaClientKnownRequestError) => {
        if (error.code === 'P2002') {
          throw new BadRequestException('Email já cadastrado.')
        }

        throw new InternalServerErrorException('Erro ao criar lead.')
      })

    const deleteLead = async () =>
      this.leadsRepository.deleteLead({ id: lead.id })

    const unidades = await Promise.all(
      analysedFiles.map(async (file) => {
        return this.unidadesRepository
          .createUnidade({
            data: {
              codigoDaUnidadeConsumidora: file.unit_key,
              modeloFasico: file.phaseModel,
              enquadramento: file.chargingModel,

              lead: {
                connect: {
                  id: lead.id,
                },
              },
            },
          })
          .catch(async (error: PrismaClientKnownRequestError) => {
            if (error.code === 'P2002') {
              await deleteLead()
              throw new BadRequestException(
                `Uma ou mais contas enviadas já possui a chave de unidade cadastrada (${file.unit_key}).`,
              )
            }

            throw new InternalServerErrorException('Erro ao criar unidade.')
          })
      }),
    )

    await Promise.all(
      analysedFiles.map((file) => {
        const invoice = file.invoice
        const unidade = unidades.find(
          (unidade) => unidade.codigoDaUnidadeConsumidora === file.unit_key,
        )

        if (!unidade) {
          throw new InternalServerErrorException(
            'Unidade não encontrada para o arquivo analisado.',
          )
        }

        return this.consumosRepository.createManyConsumos({
          data: invoice.map((consumo) => ({
            consumoForaPontaEmKWH: consumo.consumo_fp,
            mesDoConsumo: consumo.consumo_date,
            unidadeId: unidade.id,
          })),
        })
      }),
    )

    return lead
  }
}
