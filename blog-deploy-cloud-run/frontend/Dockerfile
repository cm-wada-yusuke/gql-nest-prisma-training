FROM node:16 AS builder

ARG google_analytics_id
ARG ogp_site_home
ARG contents_bucket_name
ARG graphql_endpoint

# ビルドには devDependencies もインストールする必要があるため
ENV NODE_ENV=development

# アプリに埋め込む環境変数
# ENV NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=$google_analytics_id
# ENV NEXT_PUBLIC_OGP_SITE_HOME=$ogp_site_home
# ENV NEXT_PUBLIC_CONTENTS_BUCKET_NAME=$contents_bucket_name
ENV NEXT_PUBLIC_GRAPHQL_ENDPOINT=$graphql_endpoint

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build


FROM node:16-stretch-slim AS runner
ENV NODE_ENV=production

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
# NODE_ENV=productionにしてyarn install(npm install)するとdevDependenciesがインストールされません
RUN yarn install
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
CMD ["yarn", "start"]
