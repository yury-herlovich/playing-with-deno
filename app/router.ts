import { Context, Router } from "./deps.ts";
import UserController from './users/users.controller.ts'

const userController = new UserController()

const users = new Router()
  .get('/', userController.getAll.bind(userController))
  .post('/', userController.add.bind(userController))
  .get('/:id', userController.get.bind(userController))
  .delete('/:id', userController.remove.bind(userController))
  .patch('/:id', userController.update.bind(userController))
  .put('/:id', userController.replace.bind(userController))

const healthCheck = new Router()
  .get('/', (context: Context) => context.response.body = 'health-check')

const router = new Router()
  .use("/users", users.routes(), users.allowedMethods())
  .use("/health-check", healthCheck.routes(), healthCheck.allowedMethods())

export default router
