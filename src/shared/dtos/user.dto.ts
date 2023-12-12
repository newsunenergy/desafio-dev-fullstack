import { PDFFile } from '../../core/domain/entities/pdf'
import { UserEntity } from '../../core/domain/entities/user.entity'

export class UserDTO {
  username: string
  email: string
  phone: string
  file: any
}
