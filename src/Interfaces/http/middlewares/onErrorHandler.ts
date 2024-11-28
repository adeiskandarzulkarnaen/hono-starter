import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import ClientError from "@commons/exceptions/ClientError";
import DomainErrorTranslator from "@commons/exceptions/DomainErrorTranslator";

async function onErrorHandler(err: Error, c: Context) {
  const translatedError = DomainErrorTranslator.translate(err);
  if (translatedError instanceof ClientError) {
    return c.json({
      status: 'fail',
      message: translatedError.message,
    }, translatedError.status);
  }

  // if (err instanceof HTTPException) {
  //   console.log(err.message);
  //   return err.getResponse();
  // }

  // console.error("Unhandled error:", err.message);
  return c.json({
    status: "error",
    message: "terjadi kesalahan pada server kami",
  }, 500);
}

export default onErrorHandler;
