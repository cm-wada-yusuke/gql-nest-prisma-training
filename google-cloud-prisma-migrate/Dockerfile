# syntax=docker/dockerfile:1
FROM node:16 AS builder

# Prisma CLIをdevDependenciesでインストールしたため
ENV NODE_ENV=development

# マイグレーションで必要
RUN apt-get -qy update
RUN apt-get -qy install openssl

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY prisma ./prisma
RUN yarn install
COPY . .
CMD ["yarn", "prisma", "migrate", "deploy"]
