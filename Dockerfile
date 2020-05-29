# API Image

FROM node:12.16.3-alpine

ARG PORT=3000

ENV NODE_ENV=production
ENV PORT=$PORT

WORKDIR /app

COPY . .

RUN yarn --production --pure-lockfile

ENTRYPOINT ["yarn", "start"]
