import type { CreateLeadRequest, CreateLeadResponse, Lead } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface ApiError {
  name?: string;
  message?: string;
  action?: string;
  status_code?: number;
}

export const api = {
  async createLead(data: CreateLeadRequest): Promise<CreateLeadResponse> {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("file", data.file);

    const response = await fetch(`${API_BASE_URL}/leads`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      let errorMessage = "Erro ao criar simulação";
      try {
        const errorData = (await response.json()) as ApiError;
        errorMessage = errorData.message || errorMessage;
      } catch {
        errorMessage = "Erro ao criar simulação";
      }
      throw new Error(errorMessage);
    }

    return response.json();
  },

  async listLeads(filters?: {
    name?: string;
    email?: string;
    codigoDaUnidadeConsumidora?: string;
  }): Promise<Lead[]> {
    const searchParams = new URLSearchParams();

    if (filters?.name) searchParams.append("name", filters.name);
    if (filters?.email) searchParams.append("email", filters.email);
    if (filters?.codigoDaUnidadeConsumidora)
      searchParams.append(
        "codigoDaUnidadeConsumidora",
        filters.codigoDaUnidadeConsumidora
      );

    const query = searchParams.toString();
    const url = `${API_BASE_URL}/leads${query ? `?${query}` : ""}`;

    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      let errorMessage = "Erro ao listar simulações";
      try {
        const errorData = (await response.json()) as ApiError;
        errorMessage = errorData.message || errorMessage;
      } catch {
        errorMessage = "Erro ao listar simulações";
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();

    return data;
  },

  async getLeadById(id: string): Promise<Lead> {
    const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      let errorMessage = "Erro ao obter simulação";
      try {
        const errorData = (await response.json()) as ApiError;
        errorMessage = errorData.message || errorMessage;
      } catch {
        errorMessage = "Erro ao obter simulação";
      }
      throw new Error(errorMessage);
    }

    return response.json();
  },
};
