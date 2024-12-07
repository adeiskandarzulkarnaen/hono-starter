
export type eNewAuth<T = string> = {
  accessToken: T,
};

export class NewAuth {
  public accessToken: string;

  constructor(payload: Record<string, unknown>) {
    this.verifyPayload(payload);

    const { accessToken } = payload as eNewAuth;

    this.accessToken = accessToken;
  }

  private verifyPayload(payload: Record<string, unknown>): void {
    const { accessToken } = payload;

    if (!accessToken) {
      throw new Error('NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof accessToken !== 'string') {
      throw new Error('NEW_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

export default NewAuth;
