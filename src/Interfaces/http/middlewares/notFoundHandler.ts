import { Context } from "hono";

function notFoundHandler(c: Context) {
  return c.json({
    status: 'fail',
    message: 'path not found',
  }, 200);
};

export default notFoundHandler;
