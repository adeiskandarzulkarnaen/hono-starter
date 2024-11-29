import { Hono } from 'hono';
import type { Container } from 'instances-container';


// import middleware
import type { JwtVariables } from 'hono/jwt';
import { cors } from 'hono/cors';
import { secureHeaders } from 'hono/secure-headers';
import onErrorHandler from '@interfaces/http/middlewares/onErrorHandler';
import onNotFoundHandler from '@interfaces/http/middlewares/onNotFoundHandler';


// import routes
import userRoutes from '@interfaces/http/api/users/index';
import authenticationRoutes from '@interfaces/http/api/authentications/index';



const createServer = (container: Container) => {
  const app = new Hono<{ Variables: JwtVariables }>();

  // * GLOBAL MIDDLEWARE
  app.use(cors());
  app.use(secureHeaders());


  // * ROUTING
  app.route('/users', userRoutes(container));
  app.route('/authentications', authenticationRoutes(container));


  // * GLOBAL ERROR HANDLING
  app.notFound(onNotFoundHandler);
  app.onError(onErrorHandler);
  return app;
};

export default createServer;
