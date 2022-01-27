import { Router } from 'https://deno.land/x/oak/mod.ts'
import Users from './users/users.controller.ts'

const router = new Router()
router
  .get('/users', Users.getAll)
  .post('/users', Users.add)
  .get('/users/:id', Users.get)
  .delete('/users/:id', Users.remove)
  .patch('/users/:id', Users.update)
  .put('/users/:id', Users.replace)

export default router
