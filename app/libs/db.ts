import { MongoClient, Database, Collection } from "../deps.ts";
import { User } from "../typing.ts";

class DB {
  private client: MongoClient
  private dbName = 'test'
  private _db?: Database

  constructor() {
    this.client = new MongoClient()
  }

  async connect() {
    await this.client.connect('mongodb://root:example@db:27017')
    this._db = this.client.database(this.dbName)
  }

  usersCollection(): Collection<User> {
    if (!this._db) {
      throw new Error('database not initialized')
    }

    return this._db.collection<User>('users');
  }
}

export default new DB()
