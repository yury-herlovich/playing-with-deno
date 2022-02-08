import { Bson, Collection } from "../deps.ts";
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

  getById(userId: string): Promise<User | undefined> {
    return this.collection.findOne({ _id: new Bson.ObjectId(userId) })
  }

  getAll(): Promise<User[]> {
    return this.collection.find({}).toArray()
  }

  async add(data: InsertableUser): Promise<User | undefined> {
    const userId = await this.collection.insertOne(data)
    return this.collection.findOne({ _id: userId })
  }

  remove(userId: string): Promise<number> {
    return this.collection.deleteOne({ _id: new Bson.ObjectId(userId) })
  }

  replace(userId: string, data: InsertableUser): Promise<User | undefined> {
    return this.collection.findAndModify({ _id: new Bson.ObjectId(userId) }, { update: data, new: true })
  }

  update(userId: string, data: Partial<InsertableUser>): Promise<User | undefined> {
    return this.collection.findAndModify({ _id: new Bson.ObjectId(userId) }, { update: { $set: data }, new: true })
  }
}

export default new UsersModel()
