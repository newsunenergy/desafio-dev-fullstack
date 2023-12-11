export class LeadExistsError extends Error {
  constructor () {
    super('The received Lead already exists in the database')
    this.name = 'LeadExistsError'
  }
}
