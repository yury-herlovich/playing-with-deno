import { User, InsertableUser } from "../typing.ts";
import UsersModel from './users.model.ts'

class UsersService {
  getById(userId: string): Promise<User | undefined> {
    return UsersModel.getById(userId)
  }

  getAll(): Promise<User[]> {
    return UsersModel.getAll()
  }

  add(data: InsertableUser): Promise<User> {
    return UsersModel.add(data)

  }

  remove(userId: string): Promise<boolean> {
    return UsersModel.remove(userId)
  }
}

export default new UsersService()
