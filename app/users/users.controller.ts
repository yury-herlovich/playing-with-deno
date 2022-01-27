import { httpErrors } from 'https://deno.land/x/oak/mod.ts'
import FastestValidator from 'https://esm.sh/fastest-validator@1'
import { Context, ContextWithIdParam, User } from '../typing.ts'

const users: User[] = [
  { id: 1, name: 'Yury', role: 'admin' },
]


class UsersController {
  // GET /users
  getAll(context: Context) {
    context.response.body = 'List of users'
  }

  // GET /users/:id
  get(context: ContextWithIdParam) {
    const userId = parseInt(context.params?.id)

    if (userId === undefined || isNaN(userId)) {
      throw new httpErrors.BadRequest('Wrong user ID')
    }

    const user = users.find(u => u.id === userId)

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
    })

    const user = await (context.request.body()).value
    const isValid = check(user)
    if (isValid !== true) {
      throw new httpErrors.BadRequest('Validation Error')
    }

    context.response.body = user
  }

  // DELETE /users/:id
  remove(context: ContextWithIdParam) {
    context.response.body = 'Remove user'
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