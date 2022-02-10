import { Context } from "../typing.ts";
import db from '../libs/db.ts'

export default class HealthController {
  async check(ctx: Context) {
    ctx.response.body = {
      version: '0.0.1',
      environment: 'dev',
      status: 'ok',
      dbStatus: await db.checkDB() ? 'ok' : 'error',
    }
  }
}