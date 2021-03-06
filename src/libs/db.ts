import { Collection, Database, MongoClient } from '../deps.ts';
import { Config, User } from '../typing.ts';
import { logError } from './logger.ts';

const dbName = Deno.env.get(Config.DB_NAME);
const username = Deno.env.get(Config.DB_USERNAME);
const password = Deno.env.get(Config.DB_PASSWORD);
const connection = (Deno.env.get(Config.DB_CONN) ?? '')
  .replace('{USER}', username ?? '')
  .replace('{PASSWORD}', password ?? '');

class DB {
  private client: MongoClient;
  private _db?: Database;

  constructor() {
    this.client = new MongoClient();
  }

  async connect() {
    await this.client.connect(connection);
    this._db = this.client.database(dbName);
  }

  usersCollection(): Collection<User> {
    if (!this._db) {
      throw new Error('database not initialized');
    }

    return this._db.collection<User>('users');
  }

  async checkDB(): Promise<boolean> {
    try {
      return await this._db?.listCollectionNames() ? true : false;
    } catch (err) {
      logError(err);
      return false;
    }
  }
}

export default new DB();
