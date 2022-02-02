import { httpErrors } from "https://deno.land/x/oak/mod.ts";
import { User, InsertableUser } from "../typing.ts";

class UsersModel {
  private users: User[] = [
    { id: 1, name: 'Yury', role: 'admin', age: 40 },
  ]
  private lastId = 1

  getById(userId: number): User | undefined {
    const user = this.users.find(u => u.id === userId)

    return user
  }

  getAll(): User[] {
    return this.users
  }

  add(data: InsertableUser): User {
    const newId = ++this.lastId
    this.users.push({
      ...data,
      id: newId,
    })

    const user = this.getById(newId)

    if (!user) {
      throw new Error('something is really wrong')
    }

    return user
  }

  remove(userId: number): boolean {
    const user = this.getById(userId)

    if (!user) {
      throw new httpErrors.BadRequest('User not found')
    }

    this.users = this.users.filter(u => u.id !== userId)

    return true
  }
}

export default new UsersModel()
