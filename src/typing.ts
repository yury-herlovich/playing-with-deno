import { Bson } from './deps.ts'

export {
  type OakRouterContext as RouterContext,
  type OakContext,
} from './deps.ts'

export interface User {
  _id: Bson.ObjectId;
  name: string
  role: 'admin' | 'user'
  age: number
}

export type InsertableUser = Omit<User, '_id'>

export enum Config {
  APP_VERSION = 'APP_VERSION',
  ENV = 'ENV',
  DB_CONN = 'DB_CONN',
  DB_NAME = 'DB_NAME',
  DB_USERNAME = 'DB_USERNAME',
  DB_PASSWORD = 'DB_PASSWORD',
}
