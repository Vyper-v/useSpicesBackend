import express from 'express'
import path from 'path'

import config from '../connections/mariadb'
import Controller from '../controllers/api'

const controller = new Controller(
  'products',
  process.env.NODE_ENV === 'production' ? config.production : config.development
)
const route = express.Router()

route.use(
  express.static(path.join(__dirname, controller.staticFolder.split('/')[0]))
)
route.use(express.json())
route.use(express.urlencoded({ extended: true }))

route.get('/', controller.getData)
route.get('/:id', controller.getId)
route.post('/', controller.upload.single('thumbnail'), controller.postData())
route.put('/:id', controller.upload.single('thumbnail'), controller.putId)
route.delete('/:id', controller.deleteId)

export { controller, route }