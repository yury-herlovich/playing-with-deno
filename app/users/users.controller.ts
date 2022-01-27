import { httpErrors } from "https://deno.land/x/oak/mod.ts"
import { Context, ContextWithIdParam, User } from '../typing.ts'

const users: User[] = [
  { id: 1, name: 'Yury', role: 'admin' },
]


class UsersController {
  // GET /users
  getAll(context: Context) {
    context.response.body = "List of users"
  }

  // GET /users/:id
  get(context: ContextWithIdParam) {
    const userId = parseInt(context.params?.id)

    if (userId === undefined || isNaN(userId)) {
      throw new httpErrors.BadRequest("Wrong user ID")
    }

    const user = users.find(u => u.id === userId)

    if (!user) {
      throw new httpErrors.NotFound("User not found")
    }

    context.response.body = user
  }

  // POST /users
  add(context: Context) {
    context.response.body = "Add user"
  }

  // DELETE /users/:id
  remove(context: ContextWithIdParam) {
    context.response.body = "Remove user"
  }

  // PATCH /users/:id
  update(context: ContextWithIdParam) {
    context.response.body = "Update user"
  }

  // PUT /users/:id
  replace(context: ContextWithIdParam) {
    context.response.body = "Replace user"
  }
}


export default new UsersController()