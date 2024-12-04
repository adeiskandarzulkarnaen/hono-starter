import type { sign, verify } from 'hono/jwt';
import type { JWTPayload } from 'hono/utils/jwt/types';
import AuthenticationTokenManager from '@applications/security/AuthenticationTokenManager';
import InvariantError from '@commons/exceptions/InvariantError';



class HonoJwtTokenManager extends AuthenticationTokenManager {
  constructor(public readonly honoJwt: { sign: typeof sign, verify: typeof verify }) {
    super();
  }

  public async generateAccessToken(payload: object): Promise<string> {
    const token = await this.honoJwt.sign(
      {
        ...payload,
        exp: Math.floor(Date.now() / 1000) + parseInt(process.env.ACCESS_TOKEN_AGE!),
      },
      process.env.ACCESS_TOKEN_SECRET!
    );
    return token;
  }

  public async verifyAccessToken(token: string): Promise<JWTPayload> {
    try {
      const jwtPayload = await this.honoJwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
      return jwtPayload;
    } catch {
      throw new InvariantError('Invalid Token');
    }
  }
};

export default HonoJwtTokenManager;
