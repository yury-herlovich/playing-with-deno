import { User, InsertableUser } from "../typing.ts";
import UsersModel from './users.model.ts'

class UsersService {
  getById(userId: number): User | undefined {
    return UsersModel.getById(userId)
  }

  getall(): User[] {
    return UsersModel.getAll()
  }

  add(data: InsertableUser): User {
    return UsersModel.add(data)

  }

  remove(userId: number): boolean {
    return UsersModel.remove(userId)
  }
}

export default new UsersService()
