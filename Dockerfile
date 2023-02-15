FROM node:18 as build
ARG REACT_APP_API_HOST
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
