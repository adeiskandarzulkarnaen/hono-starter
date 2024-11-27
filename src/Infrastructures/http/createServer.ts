import { Hono } from "hono";
import { cors } from 'hono/cors';
import type { JwtVariables } from 'hono/jwt';
import { Container } from "instances-container";


import errorHandler from "@interfaces/http/middlewares/errorHandler";



const createServer = (container: Container) => {

  const app = new Hono<{ Variables: JwtVariables }>();
  app.use(cors());


  /* use routes */


  app.onError(errorHandler);
  return app;
};

export default createServer;
