import { Joi, httpErrors } from "../deps.ts";
import { Context, ContextWithIdParam } from '../typing.ts'
import usersService from './users.service.ts'

class UsersController {
  private userValidationSchema = Joi.object({
    name: Joi.string(),
    role: Joi.string().valid('admin', 'user').default('user'),
    age: Joi.number().min(0).max(200),
  })

  // GET /users
  async getAll(context: Context) {
    const users = await usersService.getAll()
    context.response.body = users
  }

  // GET /users/:id
  async get(context: ContextWithIdParam) {
    const userId = this.getUserId(context)
    const user = await usersService.getById(userId)

    if (!user) {
      throw new httpErrors.NotFound('User not found')
    }

    context.response.body = user
  }

  // POST /users
  async add(context: Context) {
    const payload = await (context.request.body()).value
    const data = await this.userValidationSchema.validateAsync(payload)

    const user = await usersService.add(data)

    context.response.status = 201
    context.response.body = user
  }

  // DELETE /users/:id
  async remove(context: ContextWithIdParam) {
    const userId = this.getUserId(context)

    await usersService.remove(userId)
    context.response.status = 204
  }

  // PATCH /users/:id
  async update(context: ContextWithIdParam) {
    // const userId = this.getUserId(context)
    // const body = await (context.request.body()).value
    // const payload = this.validatePayload<InsertableUser>(body, this.userValidationSchema)

    context.response.body = 'Update user'
  }

  // PUT /users/:id
  async replace(context: ContextWithIdParam) {
    const userId = this.getUserId(context)
    const payload = await (context.request.body()).value
    const data = await this.userValidationSchema.validateAsync(payload)

    const user = await usersService.replace(userId, data)

    context.response.body = user
  }

  /**
   * Gets and validates ID from url params
   */
  private getUserId(context: ContextWithIdParam): string {
    const userId = context.params?.id

    if (userId === undefined) {
      throw new httpErrors.BadRequest('Wrong user ID')
    }

    return userId
  }
}


export default new UsersController()
