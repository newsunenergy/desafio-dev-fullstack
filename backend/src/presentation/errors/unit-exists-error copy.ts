export class UnitExistsError extends Error {
  constructor () {
    super('One ore more of the received units already exists in the database')
    this.name = 'UnitExistsError'
  }
}
