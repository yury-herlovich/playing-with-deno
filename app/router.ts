import { Router } from "./deps.ts";
import users from './users/users.controller.ts'

const router = new Router()
router
  .get('/users', users.getAll.bind(users))
  .post('/users', users.add.bind(users))
  .get('/users/:id', users.get.bind(users))
  .delete('/users/:id', users.remove.bind(users))
  .patch('/users/:id', users.update.bind(users))
  .put('/users/:id', users.replace.bind(users))

export default router
