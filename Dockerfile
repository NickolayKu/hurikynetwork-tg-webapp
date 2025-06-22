FROM node:20.18.1-alpine3.21 AS build

WORKDIR /usr/src/huriky-telegram-access

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /usr/src/huriky-telegram-access/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
