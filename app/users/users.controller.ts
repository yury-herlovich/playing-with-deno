import { Context, httpErrors } from "https://deno.land/x/oak/mod.ts"

class UsersController {
  // GET /users
  getAll(context: Context) {
    context.response.body = "List of users"
  }

  // GET /users/:id
  get(_context: Context) {
    const err = new httpErrors.NotFound("User not found")
    throw err
    // context.response.body = "Find user"
  }

  // POST /users
  add(context: Context) {
    context.response.body = "Add user"
  }

  // DELETE /users/:id
  remove(context: Context) {
    context.response.body = "Remove user"
  }

  // PATCH /users/:id
  update(context: Context) {
    context.response.body = "Update user"
  }

  // PUT /users/:id
  replace(context: Context) {
    context.response.body = "Replace user"
  }
}


export default new UsersController()