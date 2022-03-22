import { Bson } from './deps.ts';

export { type OakContext, type OakRouterContext as RouterContext } from './deps.ts';

export interface User {
  _id: Bson.ObjectId;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export type InsertableUser = Omit<User, '_id'>;

export enum Config {
  APP_VERSION = 'APP_VERSION',
  ENV = 'ENV',
  DB_CONN = 'DB_CONN',
  DB_NAME = 'DB_NAME',
  DB_USERNAME = 'DB_USERNAME',
  DB_PASSWORD = 'DB_PASSWORD',
}
