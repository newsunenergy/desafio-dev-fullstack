/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment*/
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { IClient } from './clients.interface';

describe('ClientsService', () => {
  let service: ClientsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        {
          provide: PrismaService,
          useValue: {
            client: {
              findUnique: jest.fn(),
              create: jest.fn(),
              count: jest.fn(),
              findMany: jest.fn(),
            },
            unidade: {
              findMany: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  describe('createLead', () => {
    it('deve criar um cliente com nome, email e telefone corretos', async () => {
      prisma.client.findUnique = jest.fn().mockResolvedValue(null);
      prisma.client.create = jest.fn().mockResolvedValue({
        id: '1',
        nome: 'Cliente Teste',
        email: 'teste@email.com',
        telefone: '999999999',
        unidades: [],
      });

      const data: IClient = {
        nome: 'Cliente Teste',
        email: 'teste@email.com',
        telefone: '999999999',
        unidades: [],
      };

      const result = await service.createLead(data);

      expect(result).toHaveProperty('id');
      expect(result.nome).toBe(data.nome);
      expect(result.email).toBe(data.email);
      expect(result.telefone).toBe(data.telefone);

      expect(prisma.client.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
        }),
      });
    });

    it('deve lançar um erro se o códigoDaUnidadeConsumidora já existir', async () => {
      prisma.unidade.findMany = jest.fn().mockResolvedValue([
        {
          id: 'unidade-uuid',
          codigoDaUnidadeConsumidora: 'ABC123',
        },
      ]);

      const data: IClient = {
        nome: 'Cliente Teste',
        email: 'teste@email.com',
        telefone: '999999999',
        unidades: [
          {
            codigoDaUnidadeConsumidora: 'ABC123',
            modeloFasico: 'trifasico',
            enquadramento: 'B1',
            historicoDeConsumoEmKWH: [],
          },
        ],
      };

      await expect(service.createLead(data)).rejects.toThrow(
        new ConflictException(
          `A unidade consumidora ${data.unidades && data.unidades[0].codigoDaUnidadeConsumidora} já está cadastrada.`,
        ),
      );
    });

    it('deve lançar um erro se o email já estiver cadastrado', async () => {
      prisma.client.findUnique = jest
        .fn()
        .mockResolvedValue({ email: 'teste@email.com' });

      const data = {
        nome: 'Cliente Teste',
        email: 'teste@email.com',
        telefone: '999999999',
        unidades: [],
      };

      await expect(service.createLead(data)).rejects.toThrow(
        new BadRequestException(`O e-mail ${data.email} já está cadastrado.`),
      );
    });
  });
});
