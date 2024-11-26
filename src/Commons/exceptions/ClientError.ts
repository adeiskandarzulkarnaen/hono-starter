import { HTTPException } from "hono/http-exception";
import { StatusCode } from "hono/utils/http-status";


abstract class ClientError extends HTTPException {
  constructor(message: string, statusCode: StatusCode = 400) {
    super(statusCode, { message });
    this.name = 'ClientError'
  }

  getResponse(): Response {
    return new Response(
      JSON.stringify({
        status: "fail",
        message: this.message,
      }),
      {
        status: this.status,
        headers: {
          "Content-Type" : "application/json"
        }
      }
    )
  }
};

export default ClientError;
