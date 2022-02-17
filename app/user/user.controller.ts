import { Joi, httpErrors } from "../deps.ts";
import { Context, ContextWithIdParam } from '../typing.ts'
import userService from './user.service.ts'

class UserController {
  private userValidationSchema = Joi.object({
    name: Joi.string().when('$method', { is: 'patch', then: Joi.optional(), otherwise: Joi.required() }),
    role: Joi.string().valid('admin', 'user').default('user'),
    age: Joi.number().min(0).max(200),
  })

  // GET /users
  async getAll(ctx: Context) {
    const users = await userService.getAll()
    ctx.response.body = users
  }

  // GET /users/:id
  async get(ctx: ContextWithIdParam) {
    const userId = this.getUserId(ctx)
    const user = await userService.getById(userId)

    if (!user) {
      throw new httpErrors.NotFound('User not found')
    }

    ctx.response.body = user
  }

  // POST /users
  async add(ctx: Context) {
    const payload = await (ctx.request.body()).value
    const data = await this.userValidationSchema.validateAsync(payload)

    const user = await userService.add(data)

    ctx.response.status = 201
    ctx.response.body = user
  }

  // DELETE /users/:id
  async remove(ctx: ContextWithIdParam) {
    const userId = this.getUserId(ctx)

    await userService.remove(userId)
    ctx.response.status = 204
  }

  // PATCH /users/:id
  async update(ctx: ContextWithIdParam) {
    const userId = this.getUserId(ctx)

    const payload = await (ctx.request.body()).value
    const data = await this.userValidationSchema.validateAsync(payload, { context: { method: 'patch' } })

    const user = await userService.update(userId, data)

    ctx.response.body = user
  }

  // PUT /users/:id
  async replace(ctx: ContextWithIdParam) {
    const userId = this.getUserId(ctx)

    const payload = await (ctx.request.body()).value
    const data = await this.userValidationSchema.validateAsync(payload)

    const user = await userService.replace(userId, data)

    ctx.response.body = user
  }

  /**
   * Gets and validates ID from url params
   */
  private getUserId(ctx: ContextWithIdParam): string {
    const userId = ctx.params?.id

    if (userId === undefined) {
      throw new httpErrors.BadRequest('Wrong user ID')
    }

    return userId
  }
}

export default new UserController()
