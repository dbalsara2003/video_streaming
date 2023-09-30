FROM ubuntu:latest

RUN apt-get -y update && apt-get -y install nginx

COPY index.html .
COPY default .
COPY nginx.conf .

RUN cp default /etc/nginx/sites-available/default
RUN cp index.html /var/www/html/
RUN cp nginx.conf /etc/nginx/nginx.conf

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
