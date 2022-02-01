import { User, InsertableUser } from "../typing.ts";
import UsersModel from './users.model.ts'

class UsersService {
  getById(userId: number): User | undefined {
    const user = UsersModel.getById(userId)
    return user
  }

  add(data: InsertableUser): User {
    const user = UsersModel.add(data)

    return user
  }
}

export default new UsersService()
