import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

async function errorHandler(err: Error, c: Context) {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  // console.error("Unhandled error:", err.message);
  return c.json({
    status: "error",
    message: "terjadi kesalahan pada server kami",
  }, 500);
}

export default errorHandler;
