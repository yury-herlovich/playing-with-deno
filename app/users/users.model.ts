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
}

export default new UsersModel()
