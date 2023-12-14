import { LeadFormRequest } from '../../../shared/dtos/lead-form-request.dto'

abstract class Mapper<I, O> {
  abstract mapFrom(param: I): O
}

export class LeadFormMapper extends Mapper<any, LeadFormRequest> {
  public mapFrom(param: any): LeadFormRequest {
    const form = new LeadFormRequest()
    form.email = param.email
    form.name = param.username
    //form.file = param.file
    return form
  }
}
