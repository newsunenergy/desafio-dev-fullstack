import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  UseInterceptors,
  UploadedFiles,
  HttpCode,
  HttpStatus,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CriarSimulacaoUseCase } from '../../application/use-cases/criar-simulacao.use-case';
import { ListarSimulacoesUseCase } from '../../application/use-cases/listar-simulacoes.use-case';
import { BuscarSimulacaoPorIdUseCase } from '../../application/use-cases/buscar-simulacao-por-id.use-case';
import {
  SolicitarSimulacaoSchema,
  SolicitarSimulacaoInput,
} from '../../application/dtos/solicitar-simulacao.dto';
import { FiltrosSimulacaoSchema } from '../../application/dtos/filtros-simulacao.dto';
import type { FiltrosSimulacaoInput } from '../../application/dtos/filtros-simulacao.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';

@Controller('simulacoes')
export class SimulacaoController {
  constructor(
    private criarSimulacaoUseCase: CriarSimulacaoUseCase,
    private listarSimulacoesUseCase: ListarSimulacoesUseCase,
    private buscarSimulacaoPorIdUseCase: BuscarSimulacaoPorIdUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FilesInterceptor('arquivos', 10))
  async criar(
    @Body() body: Record<string, unknown>,
    @UploadedFiles() arquivos: Express.Multer.File[],
  ) {
    if (!arquivos || arquivos.length === 0) {
      throw new BadRequestException(
        'Pelo menos um arquivo de conta de energia é obrigatório',
      );
    }

    // Log para debug
    console.log(
      'Arquivos recebidos:',
      arquivos.map((f) => ({
        originalname: f.originalname,
        mimetype: f.mimetype,
        size: f.size,
        bufferLength: f.buffer?.length,
      })),
    );

    // Parse do JSON se vier como string (multipart/form-data)
    let informacoesDaFatura: SolicitarSimulacaoInput['informacoesDaFatura'] =
      [];
    if (body.informacoesDaFatura) {
      try {
        informacoesDaFatura =
          typeof body.informacoesDaFatura === 'string'
            ? (JSON.parse(
                body.informacoesDaFatura,
              ) as SolicitarSimulacaoInput['informacoesDaFatura'])
            : (body.informacoesDaFatura as SolicitarSimulacaoInput['informacoesDaFatura']);
      } catch {
        informacoesDaFatura = [];
      }
    }

    // Criar objeto de dados para validação
    // Se não houver informacoesDaFatura, criar estrutura placeholder válida
    // que será substituída pelos dados decodificados dos arquivos
    const informacoesDaFaturaParaValidacao =
      informacoesDaFatura.length > 0
        ? informacoesDaFatura
        : arquivos.map(() => ({
            codigoDaUnidadeConsumidora: 'PLACEHOLDER', // Será substituído após decodificação
            modeloFasico: 'monofasico' as const,
            enquadramento: 'AX' as const,
            mesDeReferencia: new Date(),
            consumoEmReais: 0.01, // Valor mínimo positivo para passar na validação
            historicoDeConsumoEmKWH: Array.from({ length: 12 }, (_, idx) => ({
              consumoForaPontaEmKWH: 0,
              mesDoConsumo: new Date(
                new Date().setMonth(new Date().getMonth() - (11 - idx)),
              ),
            })),
          }));

    const data: SolicitarSimulacaoInput = {
      nomeCompleto: body.nomeCompleto as string,
      email: body.email as string,
      telefone: body.telefone as string,
      informacoesDaFatura: informacoesDaFaturaParaValidacao,
    };

    try {
      // Validar dados
      const validationPipe = new ZodValidationPipe(SolicitarSimulacaoSchema);
      const validatedData = validationPipe.transform(
        data,
      ) as SolicitarSimulacaoInput;

      const lead = await this.criarSimulacaoUseCase.execute(
        validatedData,
        arquivos,
      );

      return {
        id: lead.id,
        nomeCompleto: lead.nomeCompleto,
        email: lead.email,
        telefone: lead.telefone,
        unidades: lead.unidades.map((unidade) => ({
          id: unidade.id,
          codigoDaUnidadeConsumidora: unidade.codigoDaUnidadeConsumidora,
          modeloFasico: unidade.modeloFasico,
          enquadramento: unidade.enquadramento,
          historicoDeConsumoEmKWH: unidade.historicoDeConsumoEmKWH.map(
            (consumo) => ({
              consumoForaPontaEmKWH: consumo.consumoForaPontaEmKWH,
              mesDoConsumo: consumo.mesDoConsumo,
            }),
          ),
        })),
      };
    } catch (error) {
      // Log do erro para debug
      console.error('Erro ao criar simulação:', error);

      // Se já for uma exceção HTTP do NestJS, re-lançar
      if (
        error instanceof BadRequestException ||
        error instanceof ConflictException
      ) {
        throw error;
      }

      // Se for um erro genérico, converter para BadRequestException
      throw new BadRequestException(
        error instanceof Error ? error.message : 'Erro ao processar simulação',
      );
    }
  }

  @Get()
  async listar(
    @Query(new ZodValidationPipe(FiltrosSimulacaoSchema))
    filtros: FiltrosSimulacaoInput,
  ) {
    // Remover campos vazios dos filtros
    const filtrosLimpos: Record<string, string> = {};
    if (filtros.nome && filtros.nome.trim()) {
      filtrosLimpos.nome = filtros.nome.trim();
    }
    if (filtros.email && filtros.email.trim()) {
      filtrosLimpos.email = filtros.email.trim();
    }
    if (filtros.codigoUnidade && filtros.codigoUnidade.trim()) {
      filtrosLimpos.codigoUnidade = filtros.codigoUnidade.trim();
    }

    const leads = await this.listarSimulacoesUseCase.execute(
      Object.keys(filtrosLimpos).length > 0 ? filtrosLimpos : undefined,
    );

    return leads.map((lead) => ({
      id: lead.id,
      nomeCompleto: lead.nomeCompleto,
      email: lead.email,
      telefone: lead.telefone,
      unidades: lead.unidades.map((unidade) => ({
        id: unidade.id,
        codigoDaUnidadeConsumidora: unidade.codigoDaUnidadeConsumidora,
        modeloFasico: unidade.modeloFasico,
        enquadramento: unidade.enquadramento,
        historicoDeConsumoEmKWH: unidade.historicoDeConsumoEmKWH.map(
          (consumo) => ({
            consumoForaPontaEmKWH: consumo.consumoForaPontaEmKWH,
            mesDoConsumo: consumo.mesDoConsumo,
          }),
        ),
      })),
    }));
  }

  @Get(':id')
  async buscarPorId(@Param('id') id: string) {
    const lead = await this.buscarSimulacaoPorIdUseCase.execute(id);

    return {
      id: lead.id,
      nomeCompleto: lead.nomeCompleto,
      email: lead.email,
      telefone: lead.telefone,
      unidades: lead.unidades.map((unidade) => ({
        id: unidade.id,
        codigoDaUnidadeConsumidora: unidade.codigoDaUnidadeConsumidora,
        modeloFasico: unidade.modeloFasico,
        enquadramento: unidade.enquadramento,
        historicoDeConsumoEmKWH: unidade.historicoDeConsumoEmKWH.map(
          (consumo) => ({
            consumoForaPontaEmKWH: consumo.consumoForaPontaEmKWH,
            mesDoConsumo: consumo.mesDoConsumo,
          }),
        ),
      })),
    };
  }
}
