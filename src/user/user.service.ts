import { httpErrors } from "../deps.ts";
import { User, InsertableUser } from "../typing.ts";
import userModel from './user.model.ts'

class UserService {
  async getById(userId: string): Promise<User | undefined> {
    console.log('get user')
    const user = await userModel.getById(userId)

    if (!user) {
      throw new httpErrors.NotFound('user not found')
    }

    return user
  }

  getAll(): Promise<User[]> {
    return userModel.getAll()
  }

  async add(data: InsertableUser): Promise<User> {
    const user = await userModel.add(data)

    if (!user) {
      throw new Error('something is really wrong')
    }

    return user
  }

  async remove(userId: string): Promise<boolean> {
    const removeCount = await userModel.remove(userId)

    if (removeCount < 1) {
      throw new httpErrors.BadRequest('User not found')
    }

    return true
  }

  async replace(userId: string, data: InsertableUser): Promise<User> {
    const user = await userModel.replace(userId, data)

    if (!user) {
      throw new httpErrors.BadRequest('User not found')
    }

    return user
  }

  async update(userId: string, data: Partial<InsertableUser>): Promise<User> {
    const user = await userModel.update(userId, data)

    if (!user) {
      throw new httpErrors.BadRequest('User not found')
    }

    return user
  }
}

export default new UserService()
