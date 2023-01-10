FROM node:16.13.0

RUN mkdir /usr/src/app

WORKDIR /usr/src/app

COPY package.json yarn.* ./

RUN yarn install --no-cache

EXPOSE 3000

CMD ["yarn", "start:dev"]