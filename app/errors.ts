import { Context, HttpError, httpErrors, isHttpError } from "https://deno.land/x/oak/mod.ts"

export async function errorHandler(ctx: Context, next: Function) {
  try {
    await next()
  } catch (err) {
    let error: HttpError = err

    if (!isHttpError(err)) {
      error = new httpErrors.InternalServerError("Internal server error")
    }

    // TODO: error logging

    ctx.response.body = {
      error: error.message,
      statusCode: error.status,
    }
    ctx.response.status = error.status
  }
}

export function routeNotFound(_ctx: Context, _next: Function) {
  throw new httpErrors.NotFound("Page not found")
}