import { Hono } from "hono";
import { Container } from "instances-container";

import errorHandler from "@interfaces/http/middlewares/errorHandler";



const createServer = (container: Container): Hono => {
  const app = new Hono();

  /* use routes */


  app.onError(errorHandler)
  return app;
};

export default createServer;
