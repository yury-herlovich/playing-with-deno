import { httpErrors } from "../deps.ts";
import { User, InsertableUser } from "../typing.ts";
import usersModel from './users.model.ts'

class UsersService {
  async getById(userId: string): Promise<User | undefined> {
    const user = await usersModel.getById(userId)

    if (!user) {
      throw new httpErrors.NotFound('user not found')
    }

    return user
  }

  getAll(): Promise<User[]> {
    return usersModel.getAll()
  }

  async add(data: InsertableUser): Promise<User> {
    const user = await usersModel.add(data)

    if (!user) {
      throw new Error('something is really wrong')
    }

    return user
  }

  async remove(userId: string): Promise<boolean> {
    const removeCount = await usersModel.remove(userId)

    if (removeCount < 1) {
      throw new httpErrors.BadRequest('User not found')
    }

    return true
  }

  async replace(userId: string, data: InsertableUser): Promise<User> {
    const user = await usersModel.replace(userId, data)

    if (!user) {
      throw new httpErrors.BadRequest('User not found')
    }

    return user
  }

  async update(userId: string, data: Partial<InsertableUser>): Promise<User> {
    const user = await usersModel.update(userId, data)

    if (!user) {
      throw new httpErrors.BadRequest('User not found')
    }

    return user
  }
}

export default new UsersService()
