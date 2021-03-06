import { Config, RouterContext } from '../typing.ts';
import db from '../libs/db.ts';

export default class HealthController {
  async check(ctx: RouterContext<'/'>) {
    ctx.response.body = {
      version: Deno.env.get(Config.APP_VERSION),
      environment: Deno.env.get(Config.ENV),
      status: 'ok',
      dbStatus: await db.checkDB() ? 'ok' : 'error',
    };
  }
}
