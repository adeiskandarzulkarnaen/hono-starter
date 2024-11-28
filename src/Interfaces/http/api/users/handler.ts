import { Context } from "hono";
import { Container } from "instances-container";
import { mapJsonError } from "@commons/mapping/errorMaping";

import { eRegisterUser } from "@domains/users/entities/RegisterUser";
import AddUserUseCase from "@applications/use_case/AddUserUseCase";


class UserHandler {
  constructor(private readonly container: Container) {
    this.postUserHandler = this.postUserHandler.bind(this);
    this.getUserHandler = this.getUserHandler.bind(this);
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

  public async getUserHandler(c: Context) {
    return c.json({
      status: 'success',
      message: 'berhasil get user with jwt',
      data: {
        name: "nama user"
      }
    }, 200);
  }
};

export default UserHandler;
