import { LeadsService } from '../leads.service'
import { Test, TestingModule } from '@nestjs/testing'
import { LeadsContract } from 'src/repositories/leads/leads.contract'
import { UnidadesContract } from 'src/repositories/unidades/unidades.contract'
import { ConsumosContract } from 'src/repositories/consumos/consumos.contract'
import { AccountAnalyserService } from 'src/providers'
import { LeadCreationDto, LeadsGetDto } from '../dtos/leads.dto'
import { BadRequestException, PreconditionFailedException, InternalServerErrorException } from '@nestjs/common'

const leadsMockRepository = {
  createLead: jest.fn(),
  findLeadByIdWithIncludes: jest.fn(),
  findLeads: jest.fn(),
  countLeads: jest.fn(),
  deleteLead: jest.fn(),
}

const consumosMockRepository = {
  createManyConsumos: jest.fn(),
}

const unidadesMockRepository = {
  createUnidade: jest.fn(),
}

const accountAnalyserMockService = {
  analyseAccounts: jest.fn(),
}

describe('LeadsService', () => {
  let leadsService: LeadsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadsService,
        { provide: LeadsContract, useValue: leadsMockRepository },
        { provide: UnidadesContract, useValue: unidadesMockRepository },
        { provide: ConsumosContract, useValue: consumosMockRepository },
        { provide: AccountAnalyserService, useValue: accountAnalyserMockService },
      ],
    }).compile()

    leadsService = module.get<LeadsService>(LeadsService)
  })

  it('should be defined', () => {
    expect(leadsService).toBeDefined()
  })

  describe('getLeadById', () => {
    it('should return a lead by id', async () => {
      const lead = { id: '1', email: 'test@example.com' }
      leadsMockRepository.findLeadByIdWithIncludes.mockResolvedValue(lead)

      const result = await leadsService.getLeadById('1')
      expect(result).toEqual(lead)
    })
  })

  describe('getLeads', () => {
    it('should return paginated leads', async () => {
      const leads = [{ id: '1', email: 'test@example.com' }]
      leadsMockRepository.findLeads.mockResolvedValue(leads)
      leadsMockRepository.countLeads.mockResolvedValue(1)

      const params: LeadsGetDto = { query: 'test' }
      const result = await leadsService.getLeads(params)
      expect(result).toEqual(leads)
    })
  })

  describe('createLead', () => {
    it('should create a lead', async () => {
      const lead = { id: '1', email: 'test@example.com' }
      leadsMockRepository.createLead.mockResolvedValue(lead)
      accountAnalyserMockService.analyseAccounts.mockResolvedValue([])

      const body: LeadCreationDto = { email: 'test@example.com', name: 'Test', phone: '123456789' }
      const files: Express.Multer.File[] = []

      const result = await leadsService.createLead(body, files)
      expect(result).toEqual(lead)
    })

    it('should throw BadRequestException if email is already registered', async () => {
      leadsMockRepository.createLead.mockRejectedValue({ code: 'P2002' })
      accountAnalyserMockService.analyseAccounts.mockResolvedValue([])

      const body: LeadCreationDto = { email: 'test@example.com', name: 'Test', phone: '123456789' }
      const files: Express.Multer.File[] = []

      await expect(leadsService.createLead(body, files)).rejects.toThrow(BadRequestException)
    })

    it('should throw PreconditionFailedException if there are duplicated unit keys', async () => {
      accountAnalyserMockService.analyseAccounts.mockResolvedValue([
        { unit_key: '123', phaseModel: 'model', chargingModel: 'model', invoice: [] },
        { unit_key: '123', phaseModel: 'model', chargingModel: 'model', invoice: [] },
      ])

      const body: LeadCreationDto = { email: 'test@example.com', name: 'Test', phone: '123456789' }
      const files: Express.Multer.File[] = []

      await expect(leadsService.createLead(body, files)).rejects.toThrow(PreconditionFailedException)
    })
  })
})
