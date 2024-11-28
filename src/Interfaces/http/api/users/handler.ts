import { Context } from "hono";
import { Container } from "instances-container";
import AddUserUseCase from "@applications/use_case/AddUserUseCase";
import { eRegisterUser } from "@domains/users/entities/RegisterUser";
import { mapJsonError } from "@commons/mapping/errorMaping";


class UserHandler {
  constructor(private readonly container: Container) {
    this.postUserHandler = this.postUserHandler.bind(this);
  };

  public async postUserHandler(c: Context) {
    const addUserUseCase: AddUserUseCase = this.container.getInstance(AddUserUseCase.name);
    const payload: eRegisterUser = await c.req.json().catch(mapJsonError);

    const addedUser = await addUserUseCase.execute(payload);

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
