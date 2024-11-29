import { Context } from "hono";
import { Container } from "instances-container";
import { eUserLogin } from "@domains/users/entities/UserLogin";
import UserLoginUseCase from "@applications/use_case/UserLoginUseCase";
import { mapJsonError } from "@commons/mapping/errorMaping";


class AuthenticationHandler {
  constructor(private readonly container: Container) {
    this.postAuthHandler = this.postAuthHandler.bind(this);
  }

  public async postAuthHandler(c: Context) {
    const userLoginUseCase: UserLoginUseCase = this.container.getInstance(UserLoginUseCase.name)
    const payload: eUserLogin = await c.req.json().catch(mapJsonError);

    const { accessToken } = await userLoginUseCase.execute(payload);

    return c.json({
      status: 'success',
      message: 'authentikasi login berhasil',
      data: {
        accessToken,
      }
    }, 201);
  }
};

export default AuthenticationHandler;
