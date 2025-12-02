import { UnidadeRepository } from "@/domain/repository-interfaces/unidade-repository";
import { Unidade } from "@/domain/entities/unidade/unidade";
import prisma from "../database/prisma";

export class UnidadePrismaRepository implements UnidadeRepository {
  async create(unidades: Unidade[], leadId: string) {
    await prisma.$transaction(async (prismaClient) => {
      for (const unidade of unidades) {
        const {
          valor,
          codigoDaUnidadeConsumidora,
          enquadramento,
          historicoDeConsumoEmKWH,
          modeloFasico,
        } = unidade;

        const newUnidade = await prismaClient.unidade.create({
          data: {
            valor: valor.value,
            codigoDaUnidadeConsumidora,
            enquadramento: enquadramento.value,
            modeloFasico: modeloFasico.value,
            leadId,
          },
        });

        const historicoDeConsumoEmKWHComUnidadeId = historicoDeConsumoEmKWH.map(
          (his) => ({
            ...his,
            unidadeId: newUnidade.id,
          })
        );

        await prismaClient.consumo.createMany({
          data: historicoDeConsumoEmKWHComUnidadeId,
        });
      }
    });

    return unidades;
  }
}
