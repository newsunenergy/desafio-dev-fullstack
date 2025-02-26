import { LeadsService } from '../leads.service'
import { Test, TestingModule } from '@nestjs/testing'

const leadsMockRepository = {}
const consumosMockRepository = {}
const unidadesMockRepository = {}

describe('LeadsService', () => {
  let leadsService: LeadsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({

    }).compile()

    leadsService = module.get<LeadsService>(LeadsService)
  })

  it('should be defined', () => {
    expect(leadsService).toBeDefined()
  })
})
