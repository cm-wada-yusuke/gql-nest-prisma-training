# syntax=docker/dockerfile:1
FROM node:16 AS builder
# ビルドには devDependencies もインストールする必要があるため
ENV NODE_ENV=development
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY prisma ./prisma
RUN yarn install
RUN yarn prisma generate
COPY . .
RUN yarn build


FROM node:16-stretch-slim AS runner
ENV NODE_ENV=production

# マイグレーションで必要
RUN apt-get -qy update
RUN apt-get -qy install openssl

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY prisma ./prisma
# NODE_ENV=productionにしてyarn install(npm install)するとdevDependenciesがインストールされません
RUN yarn install
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
CMD ["yarn", "start:prod"]