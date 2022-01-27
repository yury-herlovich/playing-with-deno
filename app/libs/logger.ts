import { Context } from "https://deno.land/x/oak/mod.ts"

// Logger
export async function logger (ctx: Context, next: Function) {
  const start = Date.now()
  await next()

  console.log(
    ctx.request.method,
    ctx.request.url.pathname,
    ctx.response.status,
    `${Date.now() - start}ms`,
    JSON.stringify(ctx.response.body)
  )
}
