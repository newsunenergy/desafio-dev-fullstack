import { Injectable, PreconditionFailedException } from '@nestjs/common'
import axios, { AxiosInstance } from 'axios'
import { AccountAnalysis, accountAnalysisSchema } from 'src/schemas'

@Injectable()
export class AccountAnalyserService {
  private api: AxiosInstance
  constructor() {
    this.api = axios.create({
      baseURL: 'https://magic-pdf.solarium.newsun.energy',
    })
  }

  async analyseAccounts(
    files: Express.Multer.File[],
  ): Promise<AccountAnalysis[]> {
    if (files.length === 0)
      throw new PreconditionFailedException('Nenhuma conta foi enviada')

    const promises = files.map((file) => {
      const fileBlob = new Blob([file.buffer], { type: file.mimetype })

      const formData = new FormData()
      formData.append('file', fileBlob, file.originalname)

      return this.api
        .post('v1/magic-pdf', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((r) => accountAnalysisSchema.parse(r.data))
    })

    const results = await Promise.all(promises)
    return results
  }
}
