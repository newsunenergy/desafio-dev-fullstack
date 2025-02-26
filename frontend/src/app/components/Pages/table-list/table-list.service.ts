/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class TableListPageService {
  async getClients(currentPage: number, limit: number, search?: any, filter?: any) {
    try {
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: limit.toString(),
        ...(search && { search }),
        ...(filter && { filter }),
      }).toString();

      const response = await fetch(`${API_URL}/clients/all?${queryParams}`);
      if (!response.ok) throw new Error("Erro ao buscar dados");

      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar dados filtrados:", error);
    }
  }


  async getClientById(id: string) {
    if (!id) return null;
    try {
      const response = await fetch(`${API_URL}/clients/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar cliente: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao obter cliente:', error);
      return null;
    }
  }

  async createClient(formData: FormData) {

    const response = await fetch(`${API_URL}/clients`, {
      method: "POST",
      body: formData
    });

    return await response.json();
  }
}


