import { FastestValidator, httpErrors } from "../deps.ts";
import { Context, ContextWithIdParam } from '../typing.ts'
import usersService from './users.service.ts'

class UsersController {
  // GET /users
  async getAll(context: Context) {
    const users = await usersService.getAll()
    context.response.body = users
  }

  // GET /users/:id
  async get(context: ContextWithIdParam) {
    const userId = context.params?.id

    if (userId === undefined) {
      throw new httpErrors.BadRequest('Wrong user ID')
    }

    const user = await usersService.getById(userId)

    if (!user) {
      throw new httpErrors.NotFound('User not found')
    }

    context.response.body = user
  }

  // POST /users
  async add(context: Context) {
    const v = new FastestValidator();
    const check = v.compile({
      name: { type: 'string', min: 3, max: 255 },
      role: { type: 'string', enum: ['admin', 'user'], default: 'user'},
      age:  { type: 'number', integer: true, positive: true, min: 0, max:99, convert: true },
    })

    const payload = await (context.request.body()).value
    const isValid = check(payload)
    if (isValid !== true) {
      throw new httpErrors.BadRequest('Validation Error')
    }

    const user = await usersService.add(payload)

    context.response.status = 201
    context.response.body = user
  }

  // DELETE /users/:id
  async remove(context: ContextWithIdParam) {
    const userId = context.params?.id

    if (userId === undefined) {
      throw new httpErrors.BadRequest('Wrong user ID')
    }

    const _result = await usersService.remove(userId)

    context.response.status = 204
    // context.response.body = ''
  }

  // PATCH /users/:id
  update(context: ContextWithIdParam) {
    context.response.body = 'Update user'
  }

  // PUT /users/:id
  replace(context: ContextWithIdParam) {
    context.response.body = 'Replace user'
  }
}


export default new UsersController()
