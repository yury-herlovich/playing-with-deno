import { httpErrors } from "../deps.ts";
import { User, InsertableUser } from "../typing.ts";
import UserModel from './user.model.ts'

export default class UserService {
  private userModel: UserModel

  constructor() {
    this.userModel = new UserModel()
  }

  async getById(userId: string): Promise<User | undefined> {
    const user = await this.userModel.getById(userId)

    if (!user) {
      throw new httpErrors.NotFound('user not found')
    }

    return user
  }

  getAll(): Promise<User[]> {
    return this.userModel.getAll()
  }

  async add(data: InsertableUser): Promise<User> {
    const user = await this.userModel.add(data)

    if (!user) {
      throw new Error('something is really wrong')
    }

    return user
  }

  async remove(userId: string): Promise<boolean> {
    const removeCount = await this.userModel.remove(userId)

    if (removeCount < 1) {
      throw new httpErrors.BadRequest('User not found')
    }

    return true
  }

  async replace(userId: string, data: InsertableUser): Promise<User> {
    const user = await this.userModel.replace(userId, data)

    if (!user) {
      throw new httpErrors.BadRequest('User not found')
    }

    return user
  }

  async update(userId: string, data: Partial<InsertableUser>): Promise<User> {
    const user = await this.userModel.update(userId, data)

    if (!user) {
      throw new httpErrors.BadRequest('User not found')
    }

    return user
  }
}
