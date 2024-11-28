
export type eUserLogin<T = string> = {
  username: T,
  password: T,
};

export class UserLogin {
  public username: string;
  public password: string;

  constructor(payload: Record<string, unknown>) {
    this.verifyPayload(payload);

    const { username, password, fullname } = payload as eUserLogin;

    this.username = username;
    this.password = password;
  }

  private verifyPayload(payload: Record<string, unknown>): void {
    const { username, password } = payload;

    if (!username || !password) {
      throw new Error('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof username !== 'string' || typeof password !== 'string') {
      throw new Error('USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}
