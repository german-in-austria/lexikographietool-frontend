# build stage
FROM node:16-alpine as build-stage

ARG END_POINT

ENV BACKEND_PORT 8000
ENV VUE_APP_API_ENDPOINT $END_POINT
ENV ENTRY_PORT 80


WORKDIR /app 
COPY package*.json ./

RUN npm install

COPY . /app

RUN npm run build

ENV NODE_ENV production

# production stage
FROM nginxinc/nginx-unprivileged:stable-alpine
COPY nginx.config /etc/nginx/conf.d/default.conf
#COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/dist /app
#COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE $ENTRY_PORT
CMD ["nginx", "-g", "daemon off;"]
