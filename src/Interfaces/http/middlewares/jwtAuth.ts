import { jwt } from 'hono/jwt';

const jwtAuth = () => {
  const secret = process.env.ACCESS_TOKEN_SECRET!;
  return jwt({ secret })
};

export default jwtAuth;
