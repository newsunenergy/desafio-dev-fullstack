import { Request, Response } from "express";
import { Create } from "@/application/use-cases/lead/create";
import { LeadPrismaRepository } from "../repository/lead-prisma-repository";
import { UnidadePrismaRepository } from "../repository/unidade-prisma-repository";
import { Exists } from "@/application/use-cases/lead/exists";
import { GetById } from "@/application/use-cases/lead/get-by-id";
import { LeadDTO } from "../dto/leadDTO";
import { GetAllLeadWithFilter } from "@/application/use-cases/lead/get-all-lead-with-filter";
import { GetAllLead } from "@/application/use-cases/lead/get-all-lead";
import { Lead } from "@/domain/entities/lead/lead";
import { clientError, ok, fail, notFound, created } from "../httpResponse";

const leadRepo = new LeadPrismaRepository();
const unidadeRepo = new UnidadePrismaRepository();

const createLeadUseCase = new Create(leadRepo, unidadeRepo);
const leadExists = new Exists(leadRepo);
const getLeadById = new GetById(leadRepo);
const getAllLeadWithFilter = new GetAllLeadWithFilter(leadRepo);
const getAllLead = new GetAllLead(leadRepo);

export async function createLead(req: Request, res: Response) {
  try {
    let lead = req.body;

    console.log("req.body", req.body);
    if (!lead.nomeCompleto || !lead.email || !lead.telefone || !lead.unidades) {
      return fail(res, {
        message: "Por favor, envie todos os campos necessários.",
      });
    }

    const leadInput = new LeadDTO(lead);

    const alreadyExists = await leadExists.execute(leadInput.email);

    if (alreadyExists.isRight()) {
      return clientError(res, { message: alreadyExists.value.message });
    }

    const newLead = await createLeadUseCase.execute(leadInput);

    if (newLead.isLeft()) {
      return clientError(res, { message: newLead.value.message });
    }

    created(res, { lead: newLead.value.toObject() });
  } catch (error: any) {
    fail(res, { message: error.message });
  }
}

export async function leadById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const lead = await getLeadById.execute(id);

    if (!lead) {
      return notFound(res, { message: "Lead não encontrado." });
    }

    ok(res, { lead: lead.toObject() });
  } catch (error: any) {
    fail(res, { message: error.message });
  }
}

export async function leadListFilter(req: Request, res: Response) {
  const filter = req.query.filter;
  let leads: Lead[] = [];

  if (filter) {
    leads = await getAllLeadWithFilter.execute(String(filter));
  } else {
    leads = await getAllLead.execute();
  }

  ok(res, { leads: leads.map((lead) => lead.toObject()) });
}
