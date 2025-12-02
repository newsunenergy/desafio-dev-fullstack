"use server";

import { UnidadeOrigin } from "@/interfaces/unidade-origin";
import { Lead } from "@/interfaces/lead";
import { revalidateTag } from "next/cache";

type ResponseLead = {
  success: boolean;
  lead: Lead;
  message: string;
};

export async function createLead(prevState: any, formData: FormData) {
  const files = formData.getAll("file");
  const unidades: UnidadeOrigin[] = [];

  let input: any = {
    nomeCompleto: formData.get("name"),
    email: formData.get("email"),
    telefone: formData.get("telefone"),
  };

  try {
    for (let i = 0; i < files.length; i++) {
      const fileFormData = new FormData();

      fileFormData.append("file", files[i]);

      const res = await fetch(
        "https://magic-pdf.solarium.newsun.energy/v1/magic-pdf",
        {
          method: "POST",
          body: fileFormData,
        }
      );

      const unidadeBody: UnidadeOrigin = await res.json();

      if (res.status === 400) {
        throw new Error("Arquivo inválido.");
      }

      unidades.push(unidadeBody);
    }

    input.unidades = unidades;

    console.log("input", JSON.stringify(input));
    const res = await fetch("http://localhost:3333/create_lead", {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    const lead: ResponseLead = await res.json();

    if (!lead.success) {
      throw new Error(lead.message);
    }

    revalidateTag("leads-list");

    return { success: true, message: null };
  } catch (error: any) {
    return { error: true, message: error.message };
  }
}
