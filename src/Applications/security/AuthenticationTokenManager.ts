
abstract class AuthenticationTokenManager {
  abstract generateAccessToken(payload: object): Promise<string>;
  abstract verifyAccessToken(token: string): Promise<object>;
};

export default AuthenticationTokenManager;
