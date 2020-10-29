FROM node:12

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build
RUN yarn global add serve

EXPOSE 5000

CMD ["serve", "-s", "build"]
