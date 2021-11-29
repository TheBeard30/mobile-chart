FROM nginx:latest

EXPOSE 8080


COPY ./config/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html

CMD ["nginx","-g","daemon off;"]
