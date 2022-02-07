import { Context, HttpError, httpErrors, isHttpError } from '../deps.ts'
import { logError } from "./logger.ts";

export async function errorHandler(ctx: Context, next: Function) {
  try {
    await next()
  } catch (err) {
    logError(err)

    let error: HttpError = err

    if (err.name === 'ValidationError') {
      // TODO: parse validations errors
      error = new httpErrors.BadRequest('Validation error')
    } else if (!isHttpError(err)) {
      error = new httpErrors.InternalServerError('Internal server error')
    }

    ctx.response.body = {
      error: error.message,
      statusCode: error.status,
    }
    ctx.response.status = error.status
  }
}

export function routeNotFound(_ctx: Context, _next: Function) {
  throw new httpErrors.NotFound('Endpoint not found')
}