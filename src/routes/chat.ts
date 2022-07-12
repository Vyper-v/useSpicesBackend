import express from 'express'
import path from 'path'

import Controller from '../controllers/chats'

const controller = new Controller()
const route = express.Router()

route.use(
  express.static(path.join(__dirname, controller.staticFolder.split('/')[0]))
)
route.use(express.json())
route.use(express.urlencoded({ extended: true }))

route.get('/', controller.getData)
route.get('/:id', controller.getId)
route.post('/', controller.postData())
route.put('/:id', controller.putId)
route.delete('/:id', controller.deleteId)

export { controller, route }