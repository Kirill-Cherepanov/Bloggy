FROM node:19-alpine

ARG API_PORT=8080

ENV NODE_ENV production
ENV PORT ${API_PORT}

RUN mkdir /bloggy-api
WORKDIR /bloggy-api

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .
RUN yarn build

EXPOSE ${API_PORT}

CMD [ "yarn", "production" ]
