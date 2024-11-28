import { Context } from "hono";
import { Container } from "instances-container";


class AuthenticationHandler {
  constructor(private readonly container: Container) {
    this.postAuthHandler = this.postAuthHandler.bind(this);
  }

  public async postAuthHandler(c: Context) {
    return c.json({
      status: 'success',
      message: 'authentikasi login berhasil',
      data: {
        accessToken: "ini accessToken"
      }
    }, 201);
  }
};

export default AuthenticationHandler;
