# Use the official MySQL image as the base image
FROM mysql:latest

# Set the environment variables for the MySQL root user
ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_DATABASE=video_streaming

COPY create_table.sql /docker-entrypoint-initdb.d/

EXPOSE 3306/tcp
