import { Bson, Collection, httpErrors } from "../deps.ts";
import { User, InsertableUser } from "../typing.ts";
import db from '../libs/db.ts'

class UsersModel {
  private _collection?: Collection<User>

  private get collection(): Collection<User> {
    if (!this._collection) {
      this._collection = db.usersCollection()
    }

    return this._collection
  }

  async getById(userId: string): Promise<User | undefined> {
    const user = await this.collection.findOne({ _id: new Bson.ObjectId(userId) })

    if (!user) {
      throw new httpErrors.NotFound('user not found')
    }

    return user
  }

  async getAll(): Promise<User[]> {
    const users = await this.collection.find({}).toArray()

    return users
  }

  async add(data: InsertableUser): Promise<User> {
    const userId = await this.collection.insertOne(data)
    const user = await this.collection.findOne({ _id: userId })

    if (!user) {
      throw new Error('something is really wrong')
    }

    return user
  }

  async remove(userId: string): Promise<boolean> {
    const removeCount = await this.collection.deleteOne({ _id: new Bson.ObjectId(userId) })

    if (removeCount < 1) {
      throw new httpErrors.BadRequest('User not found')
    }

    return true
  }
}

export default new UsersModel()
