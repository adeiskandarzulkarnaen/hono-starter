import { Hono } from 'hono';
import { Container } from 'instances-container';
import UserHandler from './handler';
import routes from './routes';


/**
 * Users ROUTING
 * anda dapat mendaftarkan routing ini direkomendasikan mengunakan path '/users'
 *
 * contoh: app.route('/users', userRoutes(container));
 *
 * @param {Container} container
 * @returns {Hono}
 */
const userRoutes = (container: Container): Hono => {
  const userHandler = new UserHandler(container);
  return routes(userHandler);
};


export default userRoutes;
