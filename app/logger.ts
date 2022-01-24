import { Context } from "https://deno.land/x/oak/mod.ts";

// Logger
export async function logger (ctx: Context, next: Function) {
  const start = Date.now();
  await next()
  const rt = Date.now() - start;
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`)
}
