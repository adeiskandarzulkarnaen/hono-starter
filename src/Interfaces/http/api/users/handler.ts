import { Context } from "hono";
import { Container } from "instances-container";
import AddUserUseCase from "@applications/use_case/AddUserUseCase";


class UserHandler {
  constructor(private readonly container: Container) {
    this.postUserHandler = this.postUserHandler.bind(this);
  };

  public async postUserHandler(c: Context) {
    const addUserUseCase: AddUserUseCase = this.container.getInstance(AddUserUseCase.name);

    const reqBodyJson = await c.req.json();
    const addedUser = await addUserUseCase.execute(reqBodyJson);

    const data = await c.req.json();
    return c.json({
      status: 'success',
      message: 'berhasil mendaftarkan user',
      data: {
        addedUser,
      }
    })
  }
};

export default UserHandler;
