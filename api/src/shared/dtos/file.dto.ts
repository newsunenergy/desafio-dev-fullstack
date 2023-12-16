import { createReadStream, renameSync } from 'fs'

export class FileDTO {
  public static mapToPdfFormData(file: File) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const FormData = require('form-data')
    const uploadedFile = file['file'][0]
    const formData = new FormData()
    formData.append('file', createReadStream(uploadedFile.path + '.pdf'))
    formData.headers = { 'Content-Type': 'multipart/form-data' }
    renameSync(uploadedFile.path, uploadedFile.path + '.pdf')
    return formData
  }
}
