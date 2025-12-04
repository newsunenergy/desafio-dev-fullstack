import { Test, TestingModule } from '@nestjs/testing';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { PdfService } from '../pdf/pdf.service';
import { ValidationError, NotFoundError } from '../core/errors';

jest.mock('../pdf/pdf.service');

describe('LeadsController', () => {
  let controller: LeadsController;
  let leadsService: jest.Mocked<LeadsService>;
  let pdfService: jest.Mocked<PdfService>;

  const mockLeadResponse = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '(85) 99772-0796',
    units: [
      {
        id: 'unit-1',
        codigoDaUnidadeConsumidora: '14476614',
        historicoDeConsumoEmKWH: [
          {
            consumptionDate: new Date('2024-01-01'),
            offPeakKwh: 100,
            peakKwh: 50,
          },
        ],
        amount: 802.72,
        barcode: '12345.67890',
        chargingModel: 'B3',
        phaseModel: 'Trifásico',
        energyCompanyId: 'company-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCreateLeadResponse = {
    lead: mockLeadResponse,
    unit: mockLeadResponse.units[0],
  };

  const mockProcessedPdf = {
    invoice: [
      { consumptionDate: '2024-01-01', offPeakKwh: 100, peakKwh: 50 },
      { consumptionDate: '2024-02-01', offPeakKwh: 110, peakKwh: 55 },
    ],
    amount: 802.72,
    barcode: '12345.67890',
    chargingModel: 'B3',
    phaseModel: 'Trifásico',
    unitKey: '14476614',
    energyCompanyId: 'company-1',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadsController],
      providers: [
        {
          provide: LeadsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
          },
        },
        {
          provide: PdfService,
          useValue: {
            decodeInvoiceFromBuffer: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<LeadsController>(LeadsController);
    leadsService = module.get<LeadsService>(
      LeadsService,
    ) as jest.Mocked<LeadsService>;
    pdfService = module.get<PdfService>(PdfService) as jest.Mocked<PdfService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createLead', () => {
    it('should create a lead with valid PDF file', async () => {
      const mockFile = {
        fieldname: 'file',
        originalname: 'invoice.pdf',
        encoding: '7bit',
        mimetype: 'application/pdf',
        size: 1024,
        buffer: Buffer.from('mock pdf content'),
        destination: '',
        filename: '',
        path: '',
      } as unknown as Express.Multer.File;

      const createDto = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '(85) 99772-0796',
        unitKey: '14476614',
      };

      pdfService.decodeInvoiceFromBuffer.mockResolvedValue(mockProcessedPdf);
      leadsService.create.mockResolvedValue(mockCreateLeadResponse);

      const result = await controller.createLead(mockFile, createDto);

      expect(result).toEqual(mockCreateLeadResponse);
      expect(pdfService.decodeInvoiceFromBuffer).toHaveBeenCalledWith(
        mockFile.buffer,
        mockFile.originalname,
        mockFile.mimetype,
        mockFile.size,
      );
      expect(leadsService.create).toHaveBeenCalled();
    });

    it('should throw ValidationError if no file is provided', async () => {
      const createDto = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '(85) 99772-0796',
        unitKey: '14476614',
      };

      await expect(
        controller.createLead(
          undefined as unknown as Express.Multer.File,
          createDto,
        ),
      ).rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError if file buffer is missing', async () => {
      const mockFile = {
        fieldname: 'file',
        originalname: 'invoice.pdf',
        encoding: '7bit',
        mimetype: 'application/pdf',
        size: 1024,
        buffer: null,
        destination: '',
        filename: '',
        path: '',
      } as unknown as Express.Multer.File;

      const createDto = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '(85) 99772-0796',
        unitKey: '14476614',
      };

      await expect(controller.createLead(mockFile, createDto)).rejects.toThrow(
        ValidationError,
      );
    });
  });

  describe('listLeads', () => {
    it('should return all leads without filters', async () => {
      const mockLeads = [mockLeadResponse];
      leadsService.findAll.mockResolvedValue(mockLeads);

      const result = await controller.listLeads();

      expect(result).toEqual(mockLeads);
      expect(leadsService.findAll).toHaveBeenCalledWith({});
    });

    it('should filter leads by name', async () => {
      const mockLeads = [mockLeadResponse];
      leadsService.findAll.mockResolvedValue(mockLeads);

      const result = await controller.listLeads('John');

      expect(result).toEqual(mockLeads);
      expect(leadsService.findAll).toHaveBeenCalledWith({ name: 'John' });
    });

    it('should filter leads by email', async () => {
      const mockLeads = [mockLeadResponse];
      leadsService.findAll.mockResolvedValue(mockLeads);

      const result = await controller.listLeads(
        undefined,
        'john@example.com',
        undefined,
      );

      expect(result).toEqual(mockLeads);
      expect(leadsService.findAll).toHaveBeenCalledWith({
        email: 'john@example.com',
      });
    });

    it('should filter leads by unit code', async () => {
      const mockLeads = [mockLeadResponse];
      leadsService.findAll.mockResolvedValue(mockLeads);

      const result = await controller.listLeads(
        undefined,
        undefined,
        '14476614',
      );

      expect(result).toEqual(mockLeads);
      expect(leadsService.findAll).toHaveBeenCalledWith({
        codigoDaUnidadeConsumidora: '14476614',
      });
    });

    it('should apply multiple filters simultaneously', async () => {
      const mockLeads = [mockLeadResponse];
      leadsService.findAll.mockResolvedValue(mockLeads);

      const result = await controller.listLeads(
        'John',
        'john@example.com',
        '14476614',
      );

      expect(result).toEqual(mockLeads);
      expect(leadsService.findAll).toHaveBeenCalledWith({
        name: 'John',
        email: 'john@example.com',
        codigoDaUnidadeConsumidora: '14476614',
      });
    });

    it('should return empty array when no leads found', async () => {
      leadsService.findAll.mockResolvedValue([]);

      const result = await controller.listLeads();

      expect(result).toEqual([]);
    });
  });

  describe('getLeadById', () => {
    it('should return a lead by id', async () => {
      leadsService.findById.mockResolvedValue(mockLeadResponse);

      const result = await controller.getLeadById('1');

      expect(result).toEqual(mockLeadResponse);
      expect(leadsService.findById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundError when lead not found', async () => {
      leadsService.findById.mockRejectedValue(
        new NotFoundError({ message: 'Lead not found' }),
      );

      await expect(controller.getLeadById('999')).rejects.toThrow(
        NotFoundError,
      );
      expect(leadsService.findById).toHaveBeenCalledWith('999');
    });

    it('should handle different lead IDs', async () => {
      const differentLead = { ...mockLeadResponse, id: 'different-id' };
      leadsService.findById.mockResolvedValue(differentLead);

      const result = await controller.getLeadById('different-id');

      expect(result.id).toBe('different-id');
      expect(leadsService.findById).toHaveBeenCalledWith('different-id');
    });
  });
});
