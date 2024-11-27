import { Hono } from "hono";
import { cors } from 'hono/cors';
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'
import { prettyJSON } from 'hono/pretty-json'
import type { JwtVariables } from 'hono/jwt';
import { Container } from "instances-container";

// import routes
import userRoutes from '@interfaces/http/api/users/index';

// import middleware
import onErrorHandler from '@interfaces/http/middlewares/onErrorHandler';
import onNotFoundHandler from "@interfaces/http/middlewares/onNotFoundHandler";


const createServer = (container: Container) => {
  const app = new Hono<{ Variables: JwtVariables }>();

  // * GLOBAL MIDDLEWARE
  app.use(cors());
  // app.use(secureHeaders())
  // app.use(logger())
  // app.use(prettyJSON())


  // * ROUTING
  app.route('/users', userRoutes(container));


  // * GLOBAL ERROR HANDLING
  app.notFound(onNotFoundHandler);
  app.onError(onErrorHandler);
  return app;
};

export default createServer;
