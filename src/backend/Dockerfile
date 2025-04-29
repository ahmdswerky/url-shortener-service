FROM oven/bun:1 AS base

WORKDIR /app

COPY package*.json ./

RUN bun install

USER 1000:1000

COPY . .

EXPOSE 3000

CMD ["bun", "run", "start:dev"] 