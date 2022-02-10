import { MongoClient, Database, Collection } from "../deps.ts";
import { User } from "../typing.ts";
import { logError } from "./logger.ts";

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

  async checkDB(): Promise<boolean> {
    try {
      return await this._db?.listCollectionNames() ? true : false
    } catch (err) {
      logError(err)
      return false
    }
  }
}

export default new DB()
