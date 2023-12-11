import { PDFFile } from '../../core/domain/entities/pdf'

export class LeadFormRequest {
  name: string
  email: string
  phone: string
  file: PDFFile[]
}
