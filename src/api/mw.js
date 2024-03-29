import { createContext } from "@/api/createContext"
import {
  HttpForbiddenError,
  HttpNotFoundError,
  HttpPublicError,
  PublicError,
} from "@/api/errors"
import { HTTP_ERRORS } from "@/pages/api/constants"
import { JsonWebTokenError } from "jsonwebtoken"
import { randomUUID } from "node:crypto"
import { NotFoundError } from "objection"

const handleError = (err, { res }) => {
  const error = (() => {
    if (err instanceof JsonWebTokenError) {
      return new HttpForbiddenError()
    }

    if (err instanceof NotFoundError) {
      return new HttpNotFoundError()
    }

    return err
  })()

  if (!(error instanceof PublicError)) {
    res
      .status(HTTP_ERRORS.INTERNAL_SERVER_ERROR)
      .send({ error: "Something went wrong." })
      
    return
  }

  if (error instanceof HttpPublicError) {
    res.status(error.statusCode)
  }

  res.send({ error: error.message })
}
const mw = (methodHandlers) => async (req, res) => {
  const requestId = randomUUID()
  const handlers = methodHandlers[req.method.toUpperCase()]

  if (!handlers) {
    res.status(HTTP_ERRORS.NOT_FOUND).send({ error: "Method not allowed" })

    return
  }

  let currentHandlerIndex = -1
  const next = async () => {
    currentHandlerIndex += 1
    const handleNext = handlers[currentHandlerIndex]

    await handleNext(ctx)
  }
  const ctx = createContext({
    req,
    res,
    next,
    requestId,
  })

  try {
    await next()
  } catch (err) {
    await handleError(err, ctx)
  } finally {
    await ctx.db.destroy()
  }
}

export default mw
