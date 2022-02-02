import { httpErrors } from 'https://deno.land/x/oak/mod.ts'
import FastestValidator from 'https://esm.sh/fastest-validator@1'
import { Context, ContextWithIdParam } from '../typing.ts'
import usersService from './users.service.ts'

class UsersController {
  // GET /users
  getAll(context: Context) {
    const users = usersService.getall()
    context.response.body = users
  }

  // GET /users/:id
  get(context: ContextWithIdParam) {
    const userId = parseInt(context.params?.id)

    if (userId === undefined || isNaN(userId)) {
      throw new httpErrors.BadRequest('Wrong user ID')
    }

    const user = usersService.getById(userId)

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

    const user = usersService.add(payload)

    context.response.body = user
  }

  // DELETE /users/:id
  remove(context: ContextWithIdParam) {
    const userId = parseInt(context.params?.id)

    if (userId === undefined || isNaN(userId)) {
      throw new httpErrors.BadRequest('Wrong user ID')
    }

    const _result = usersService.remove(userId)

    context.response.body = ''
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
