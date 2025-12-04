import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/leads';

export const leadsApi = {
  async createLead(formData: FormData) {
    const response = await axios.post(API_BASE_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  async getLeads(filters?: { name?: string; email?: string; ConsumerUnitCode?: string }) {
    const response = await axios.get(API_BASE_URL, { params: filters });
    return response.data;
  },

  async getLeadById(id: string) {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  async deleteLead(id: string) {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  },
};
