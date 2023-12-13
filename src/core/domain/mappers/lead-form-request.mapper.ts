import { LeadFormRequest } from '../../../shared/dtos/lead-form-request.dto'
import { UserDTO } from '../../../shared/dtos/user.dto'

abstract class Mapper<I, O> {
  abstract mapFrom(param: I): O
}

export class LeadFormMapper extends Mapper<UserDTO, LeadFormRequest> {
  public mapFrom(param: UserDTO): LeadFormRequest {
    const form = new LeadFormRequest()
    form.email = param.email
    form.name = param.username
    //form.file = param.file
    return form
  }
}
