import { Context } from "hono";

function onNotFoundHandler(c: Context) {
  return c.json({
    status: 'fail',
    message: 'endpoint not found',
  }, 404);
};

export default onNotFoundHandler;
