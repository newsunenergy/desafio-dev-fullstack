import { Router } from 'express'

export default (router: Router): void => {
  router.get('/hello', (req, res) => {
    res.send('Hello world!')
  })
}
