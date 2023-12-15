import { FileDTO } from './file.dto'

export class LeadFormRequest {
  name: string
  email: string
  phone: string
  file: FileDTO[]

  public static mapFrom(rawUser: any) {
    const userInstance = new LeadFormRequest()
    userInstance.name = rawUser.name
    userInstance.phone = rawUser.phone
    userInstance.email = rawUser.email
    return userInstance
  }
}
