import { bearerAuth as bearerAuthMiddleware } from 'hono/bearer-auth';
import { MiddlewareHandler } from 'hono';


function bearerAuth(): MiddlewareHandler {
  const token: string | undefined = process.env.BEARER_TOKEN;

  if (!token) {
    throw new Error('Environment variable BEARER_TOKEN is not set');
  }

  return bearerAuthMiddleware({
    token,
    noAuthenticationHeaderMessage: {
      status: 'fail',
      message: 'no bearer token'
    },
    invalidAuthenticationHeaderMessage: {
      status: 'fail',
      message: 'invalid auth'
    },
    invalidTokenMessage: {
      status: 'fail',
      message: 'invalid bearer token'
    }
  });
};

export default bearerAuth;
