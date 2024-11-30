import { Context } from 'hono';
import { Container } from 'instances-container';
import { eRegisterUser } from '@domains/users/entities/RegisterUser';
import { AddUserUseCase } from '@applications/use_case/AddUserUseCase';
import { mapJsonError } from '@commons/mapping/errorMaping';
import jwtAuth from '@interfaces/http/middlewares/jwtAuth';


class UserHandler {
  constructor(private readonly container: Container) {
    /* do something */
  };

  public postUserHandlers = [async (c: Context) => {
    const addUserUseCase: AddUserUseCase = this.container.getInstance(AddUserUseCase.name);
    const payload: eRegisterUser = await c.req.json().catch(mapJsonError);

    const addedUser = await addUserUseCase.execute(payload);

    return c.json({
      status: 'success',
      message: 'berhasil mendaftarkan user',
      data: {
        addedUser,
      }
    });
  }];

  public getUserHandlers = [jwtAuth(), (c: Context) => {
    const payload = c.get('jwtPayload');

    return c.json({
      status: 'success',
      message: 'berhasil get data user',
      data: {
        payload,
      }
    });
  }];
};

export default UserHandler;
