FROM ubuntu:latest

WORKDIR /app

COPY package*.json ./

RUN apt-get update && \
    apt-get install -y nodejs npm && \
    npm install

COPY . .

COPY upload.html /app/public/

EXPOSE 4000/tcp

CMD ["node", "app.js", "&"]
