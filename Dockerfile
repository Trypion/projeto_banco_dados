FROM node:16-alpine

ENV NODE_ENV production

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .

RUN rm -rf /usr/src/app/node_modules

RUN npm install

EXPOSE 5000

CMD [ "npm", "start" ]
