import container from '@infrastructures/container';
import createServer from '@infrastructures/http/createServer';


// * START Hono Server
const app = createServer(container);
const PORT = process.env.PORT;

console.log(`Server up and running on port ${PORT}...`);
export default {
  port: PORT,
  fetch: app.fetch,
};
