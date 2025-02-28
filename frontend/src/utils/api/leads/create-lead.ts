import { Lead, LeadFormData } from "@/src/schemas";
import { api } from "..";

export async function createLead(data: LeadFormData): Promise<Lead> {
    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('phone', data.phone)

    data.files.forEach(file => {
        formData.append('files', file)
    })
    
    return api.post('/leads', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
          }
    }).then(res => res.data)
}