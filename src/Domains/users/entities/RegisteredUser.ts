
export type eRegisteredUser<T = string> = {
  id: T,
  username: T,
  fullname: T,
};

export class RegisteredUser {
  public id: string;
  public username: string;
  public fullname: string;

  constructor(payload: Record<string, unknown>) {
    this.verifyPayload(payload);
    const { id, username, fullname } = payload as eRegisteredUser;

    this.id = id;
    this.username = username;
    this.fullname = fullname;
  }

  private verifyPayload({ id, username, fullname }: Record<string, unknown>) {
    if (!id || !username || !fullname) {
      throw new Error('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof username !== 'string' || typeof fullname !== 'string') {
      throw new Error('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
};
