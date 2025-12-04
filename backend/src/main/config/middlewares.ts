import { Express } from 'express'
import { bodyParser, contentType } from '../middlewares'
import { cors } from '../middlewares/cors'

export default (app: Express): void => {
  app.use(cors)
  app.use(bodyParser)
  app.use(contentType)
}
