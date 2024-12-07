FROM oven/bun:alpine

ENV PORT=
ENV DATABASE_URL=
ENV ACCESS_TOKEN_AGE=
ENV ACCESS_TOKEN_SECRET=

LABEL maintainer="adeiskandarzulkarnaen@gmail.com"
LABEL description="A Docker image for a Bun HONO application"
LABEL version="1.0"

WORKDIR /app

COPY . .

RUN bun install
RUN bunx prisma generate

EXPOSE $APP_PORT/tcp

CMD ["sh", "-c", "bun run migrate:up && bun run start:dev"]
