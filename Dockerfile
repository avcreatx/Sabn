FROM node:20-alpine AS build

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .

RUN pnpm build

# Production image — Nitro bundles dependencies into .output, so nothing else is needed
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/.output ./.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
