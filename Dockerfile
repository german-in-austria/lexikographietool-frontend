# build stage
FROM node:lts-alpine as build-stage

ENV VUE_APP_API_ENDPOINT "http://localhost:${BACKEND_PORT}/"
ENV ENTRY_PORT 80
ENV NODE_ENV production

WORKDIR /app 
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY nginx.config /etc/nginx/conf.d/default.conf
#COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/dist /app
#COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE $ENTRY_PORT
CMD ["nginx", "-g", "daemon off;"]
