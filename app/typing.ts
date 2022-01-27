import { Context as oakContext } from 'https://deno.land/x/oak/mod.ts'

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
}
