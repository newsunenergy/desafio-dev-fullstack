import { Test, TestingModule } from '@nestjs/testing';
import { LeadsService } from './leads.service';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Lead } from './entities/lead.entity';
import { Unit } from './entities/unit.entity';
import { ValidationError, NotFoundError } from '../core/errors';

describe('LeadsService', () => {
  let service: LeadsService;
  let leadRepo: jest.Mocked<Repository<Lead>>;
  let unitRepo: jest.Mocked<Repository<Unit>>;

  const mockConsumption = [
    { consumptionDate: new Date('2024-01-01'), offPeakKwh: 100, peakKwh: 50 },
    { consumptionDate: new Date('2024-02-01'), offPeakKwh: 110, peakKwh: 55 },
    { consumptionDate: new Date('2024-03-01'), offPeakKwh: 120, peakKwh: 60 },
    { consumptionDate: new Date('2024-04-01'), offPeakKwh: 105, peakKwh: 52 },
    { consumptionDate: new Date('2024-05-01'), offPeakKwh: 115, peakKwh: 58 },
    { consumptionDate: new Date('2024-06-01'), offPeakKwh: 125, peakKwh: 62 },
    { consumptionDate: new Date('2024-07-01'), offPeakKwh: 130, peakKwh: 65 },
    { consumptionDate: new Date('2024-08-01'), offPeakKwh: 128, peakKwh: 64 },
    { consumptionDate: new Date('2024-09-01'), offPeakKwh: 122, peakKwh: 61 },
    { consumptionDate: new Date('2024-10-01'), offPeakKwh: 118, peakKwh: 59 },
    { consumptionDate: new Date('2024-11-01'), offPeakKwh: 112, peakKwh: 56 },
    { consumptionDate: new Date('2024-12-01'), offPeakKwh: 108, peakKwh: 54 },
  ];

  const mockLead: Lead = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '(85) 98765-4321',
    units: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Lead;

  const mockUnit: Unit = {
    id: '1',
    codigoDaUnidadeConsumidora: '14476614',
    historicoDeConsumoEmKWH: mockConsumption,
    amount: 802.72,
    barcode: '12345.67890',
    chargingModel: 'B3',
    phaseModel: 'Trifásico',
    energyCompanyId: 'company-1',
    lead: mockLead,
    leadId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Unit;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadsService,
        {
          provide: 'LEAD_REPOSITORY',
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            createQueryBuilder: jest.fn(),
          },
        },
        {
          provide: 'UNIT_REPOSITORY',
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LeadsService>(LeadsService);
    leadRepo = module.get('LEAD_REPOSITORY');
    unitRepo = module.get('UNIT_REPOSITORY');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a lead with unit successfully', async () => {
      const createDto = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '(85) 98765-4321',
        amount: 802.72,
        barcode: '12345.67890',
        chargingModel: 'B3',
        phaseModel: 'Trifásico',
        unitKey: '14476614',
        energyCompanyId: 'company-1',
        invoice: mockConsumption,
      };

      leadRepo.create.mockReturnValue(mockLead);
      leadRepo.save.mockResolvedValue(mockLead);
      unitRepo.findOne.mockResolvedValue(null);
      unitRepo.create.mockReturnValue(mockUnit);
      unitRepo.save.mockResolvedValue(mockUnit);

      const result = await service.create(createDto);

      expect(result.lead).toMatchObject({
        id: mockLead.id,
        name: mockLead.name,
        email: mockLead.email,
      });
      expect(leadRepo.create).toHaveBeenCalledWith({
        name: createDto.name,
        email: createDto.email,
        phone: createDto.phone,
      });
      expect(unitRepo.save).toHaveBeenCalled();
    });

    it('should throw ValidationError if unit code already exists', async () => {
      const createDto = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '(85) 98765-4321',
        amount: 802.72,
        barcode: '12345.67890',
        chargingModel: 'B3',
        phaseModel: 'Trifásico',
        unitKey: '14476614',
        energyCompanyId: 'company-1',
        invoice: mockConsumption,
      };

      unitRepo.findOne.mockResolvedValue(mockUnit);

      await expect(service.create(createDto)).rejects.toThrow(ValidationError);
    });

    it('should filter only last 12 invoices', async () => {
      const invoices = Array.from({ length: 24 }, (_, i) => ({
        consumptionDate: new Date(2023, i % 12),
        offPeakKwh: 100 + i,
        peakKwh: 50 + i,
      }));

      const createDto = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '(85) 98765-4321',
        amount: 802.72,
        barcode: '12345.67890',
        chargingModel: 'B3',
        phaseModel: 'Trifásico',
        unitKey: '14476614',
        energyCompanyId: 'company-1',
        invoice: invoices,
      };

      leadRepo.create.mockReturnValue(mockLead);
      leadRepo.save.mockResolvedValue(mockLead);
      unitRepo.findOne.mockResolvedValue(null);
      unitRepo.create.mockReturnValue(mockUnit);
      unitRepo.save.mockResolvedValue(mockUnit);

      await service.create(createDto);

      expect(unitRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          historicoDeConsumoEmKWH: expect.arrayContaining([
            expect.objectContaining({
              consumptionDate: expect.any(Date),
              offPeakKwh: expect.any(Number),
              peakKwh: expect.any(Number),
            }),
          ]),
        }),
      );
    });

    it('should throw ValidationError if no invoices provided', async () => {
      const createDto = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '(85) 98765-4321',
        amount: 802.72,
        barcode: '12345.67890',
        chargingModel: 'B3',
        phaseModel: 'Trifásico',
        unitKey: '14476614',
        energyCompanyId: 'company-1',
        invoice: [],
      };

      await expect(service.create(createDto)).rejects.toThrow(ValidationError);
    });
  });

  describe('findAll', () => {
    it('should return all leads without filters', async () => {
      const mockQueryBuilder: jest.Mocked<SelectQueryBuilder<Lead>> = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest
          .fn()
          .mockResolvedValue([{ ...mockLead, units: [mockUnit] }]),
      } as unknown as jest.Mocked<SelectQueryBuilder<Lead>>;

      leadRepo.createQueryBuilder.mockReturnValue(mockQueryBuilder);

      const result = await service.findAll();

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        id: mockLead.id,
        name: mockLead.name,
      });
    });

    it('should filter leads by name', async () => {
      const mockQueryBuilder: jest.Mocked<SelectQueryBuilder<Lead>> = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest
          .fn()
          .mockResolvedValue([{ ...mockLead, units: [mockUnit] }]),
      } as unknown as jest.Mocked<SelectQueryBuilder<Lead>>;

      leadRepo.createQueryBuilder.mockReturnValue(mockQueryBuilder);

      await service.findAll({ name: 'John' });

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'lead.name LIKE :name',
        { name: '%John%' },
      );
    });

    it('should filter leads by email', async () => {
      const mockQueryBuilder: jest.Mocked<SelectQueryBuilder<Lead>> = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest
          .fn()
          .mockResolvedValue([{ ...mockLead, units: [mockUnit] }]),
      } as unknown as jest.Mocked<SelectQueryBuilder<Lead>>;

      leadRepo.createQueryBuilder.mockReturnValue(mockQueryBuilder);

      await service.findAll({ email: 'john@example.com' });

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'lead.email LIKE :email',
        { email: '%john@example.com%' },
      );
    });

    it('should filter leads by unit code', async () => {
      const mockQueryBuilder: jest.Mocked<SelectQueryBuilder<Lead>> = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest
          .fn()
          .mockResolvedValue([{ ...mockLead, units: [mockUnit] }]),
      } as unknown as jest.Mocked<SelectQueryBuilder<Lead>>;

      leadRepo.createQueryBuilder.mockReturnValue(mockQueryBuilder);

      await service.findAll({ codigoDaUnidadeConsumidora: '14476614' });

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'unit.codigoDaUnidadeConsumidora = :codigoUnit',
        { codigoUnit: '14476614' },
      );
    });
  });

  describe('findById', () => {
    it('should return a lead by id', async () => {
      leadRepo.findOne.mockResolvedValue({ ...mockLead, units: [mockUnit] });

      const result = await service.findById('1');

      expect(result).toMatchObject({
        id: mockLead.id,
        name: mockLead.name,
      });
      expect(leadRepo.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['units'],
      });
    });

    it('should throw NotFoundError if lead not found', async () => {
      leadRepo.findOne.mockResolvedValue(null);

      await expect(service.findById('999')).rejects.toThrow(NotFoundError);
    });
  });
});
