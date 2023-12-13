import { FileArray } from 'express-fileupload'

export class FileDTO {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  buffer: Buffer
  size: number

  constructor(file: FileArray) {
    this.fieldname = file.fieldname
    this.originalname = file.originalname
    this.encoding = file.encoding
    this.mimetype = file.mimetype
    this.buffer = file.buffer
    this.size = file.size
  }
}
