import { Context as oakContext } from './deps.ts'

// general Context without params
export type Context = oakContext
// generic Context
export type ContextWithParams<T> = oakContext & { params: T }
// Context with id in params
export type ContextWithIdParam = ContextWithParams<{ id: string }>

export interface User {
  id: number
  name: string
  role: 'admin' | 'user'
  age: number
}

export type InsertableUser = Omit<User, 'id'>
