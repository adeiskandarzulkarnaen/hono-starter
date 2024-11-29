import { Hono } from 'hono';
import type UserHandler from "./handler";

// middleware
import jwtAuth from '@interfaces/http/middlewares/jwtAuth';


const routes = (handler: UserHandler): Hono => {
  const app = new Hono();

  // * ROUTING
  app.post('/', handler.postUserHandler);
  app.get('/', jwtAuth(), handler.getUserHandler);

  return app;
};

export default routes;
