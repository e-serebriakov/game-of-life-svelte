FROM node:16 as base

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

EXPOSE 3000

FROM base as dev
ENV NODE_ENV=development

COPY package*.json ./
RUN npm ci

COPY vite.config.js ./
COPY index.html ./
COPY src/ ./src
COPY public/ ./public

CMD ["npm", "run", "dev"]
