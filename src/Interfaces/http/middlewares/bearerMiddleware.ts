import { bearerAuth } from 'hono/bearer-auth';


function bearerMiddleware() {
  const token: string | undefined = process.env.BEARER_TOKEN;

  if (!token) {
    throw new Error('Environment variable BEARER_TOKEN is not set');
  }

  return bearerAuth({
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

export default bearerMiddleware;

