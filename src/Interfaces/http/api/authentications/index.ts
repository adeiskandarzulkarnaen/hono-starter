import { Hono } from 'hono';
import { Container } from 'instances-container';
import AuthenticationHandler from './handler';
import routes from './routes';


/**
 * Authentications ROUTING
 * anda dapat mendaftarkan routing ini direkomendasikan mengunakan path '/authentications'
 *
 * contoh: app.route('/authentications', userRoutes(container));
 *
 * @param {Container} container
 * @returns {Hono}
 */
const authenticationRoutes = (container: Container): Hono => {
  const authenticationHandler = new AuthenticationHandler(container);
  return routes(authenticationHandler);
};


export default authenticationRoutes;
