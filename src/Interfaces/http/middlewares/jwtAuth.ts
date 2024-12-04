import { jwt } from 'hono/jwt';
import { MiddlewareHandler } from 'hono';
import config from '@commons/config';


function jwtAuth(): MiddlewareHandler {
  const secret = config.jwt.secret!;
  return jwt({ secret });
};

export default jwtAuth;
