import axios, { AxiosResponse } from "axios"
import { DecodedBill } from "../models/DecodedBill"

export const decodePDFBill = async (file: File): Promise<DecodedBill> => {
  const formData = new FormData()
  formData.append('file', file)
  const res = await axios.post<File, AxiosResponse<DecodedBill>>(
    'https://magic-pdf.solarium.newsun.energy/v1/magic-pdf', 
    formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  return res.data
}