import { Test, TestingModule } from "@nestjs/testing";
import { LeadService } from "./lead.service";
import { PrismaService } from "src/database/prisma.service";
import { HttpService } from "@nestjs/axios";
import { LeadPDF } from "./leadModel";
import { CreateLeadDto } from "./dto/create-lead.dto";

describe("LeadService", () => {
  let service: LeadService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeadService, PrismaService, HttpService],
    }).compile();

    service = module.get<LeadService>(LeadService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("leadPDFtoCreateUnityDTO", () => {
    it("should convert LeadPDF to CreateUnitDto correctly", () => {
      const leadPDF: LeadPDF = {
        valor: 100,
        unit_key: "12345",
        phaseModel: "monofasico",
        chargingModel: "residencial",
        barcode: "123456789",
        energy_company_id: "energy123",
        invoice: [
          { consumo_fp: 50, consumo_date: new Date("2023-01") },
          { consumo_fp: 60, consumo_date: new Date("2023-02") },
        ],
      };
      const leadId = "lead123";
      const result = service.leadPDFtoCreateUnityDTO(leadPDF, leadId);

      expect(result).toEqual({
        leadID: leadId,
        consumoEmReais: leadPDF.valor,
        codigoDaUnidadeConsumidora: leadPDF.unit_key,
        modeloFasico: leadPDF.phaseModel,
        enquadramento: leadPDF.chargingModel,
        unidades: [
          { consumoForaPontaEmKWH: 50, mesDoConsumo: "2023-01" },
          { consumoForaPontaEmKWH: 60, mesDoConsumo: "2023-02" },
        ],
      });
    });
  });

  describe("createLead", () => {
    it("should create a lead successfully", async () => {
      const createLeadDto: CreateLeadDto = {
        nomeCompleto: "John Doe",
        email: "john.doe@example.com",
        telefone: "123456789",
      };

      const createdLead = {
        id: "lead123",
        ...createLeadDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prismaService.lead, "create").mockResolvedValue(createdLead);

      const result = await service.createLead(createLeadDto);
      expect(result).toEqual(createdLead);
      expect(prismaService.lead.create).toHaveBeenCalledWith({
        data: {
          nomeCompleto: createLeadDto.nomeCompleto,
          email: createLeadDto.email,
          telefone: createLeadDto.telefone,
        },
      });
    });

    it("should throw an error if lead creation fails", async () => {
      const createLeadDto: CreateLeadDto = {
        nomeCompleto: "John Doe",
        email: "john.doe@example.com",
        telefone: "123456789",
      };

      jest.spyOn(prismaService.lead, "create").mockRejectedValue(new Error("Failed to create lead"));

      await expect(service.createLead(createLeadDto)).rejects.toThrow("Failed to create lead");
    });
  });
});
