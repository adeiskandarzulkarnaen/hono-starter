import { Context } from 'hono';

function onNotFoundHandler(c: Context) {
  return c.json({
    status: 'fail',
    message: 'the requested resource does not exist', // 'endpoint not found'
  }, 404);
};

export default onNotFoundHandler;
