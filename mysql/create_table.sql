CREATE DATABASE IF NOT EXISTS video_streaming;
CREATE TABLE video_streaming.video_library (video_id INT NOT NULL AUTO_INCREMENT, video_title VARCHAR(255) NOT NULL, video_path VARCHAR(255) NOT NULL, PRIMARY KEY (video_id));
CREATE TABLE video_streaming.user (user_id INT NOT NULL AUTO_INCREMENT, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY (user_id))
