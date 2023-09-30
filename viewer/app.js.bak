const express = require("express");
const mysql = require("mysql2");
const { Client } = require("ssh2");
const bodyParser = require('body-parser');
const { createReadStream } = require("fs");

const app = express();

app.use(bodyParser.json());

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "mysql",
  user: "root",
  password: "password",
  database: "video_streaming"
});

const sshConfig = {
  host: "file_system",
  port: 22,
  username: "fileuser",
  password: "fileuser"
};

app.get("/viewer", (req, res) => {
  res.sendFile(__dirname + "/viewer.html")
});

app.get("/viewer/file_list", (req, res) => {
  pool.query("SELECT * FROM video_library", (error, results, fields) => {
    if (error) {
      console.error("Error retrieving filenames:", error);
      res.status(500).send("Error retrieving filenames");
    } else {
      const filenames = results.map(row => row.video_title);
      res.json(filenames);
    }
  });
});

app.post("/viewer/file_content", (req, res) => {
  const filename = req.body.filename;
  const video_path = "/mnt/data/" + filename;

  console.log(filename);
  console.log(video_path);

  const conn = new Client();
  conn.on("ready", () => {
    console.log("SSH Connection ready");
    conn.sftp((err, sftp) => {
      if (err) {
        console.error("Error creating SFTP connection", err);
        res.status(500).send("Error loading video");
        return;
      }
      const remotePath = "/mnt/data/" + filename;
      console.log(remotePath);
      const remoteFileStream = sftp.createReadStream(remotePath);
      remoteFileStream.on("error", (err) => {
        console.error(`Error reading remote file: ${err.message}`);
        res.status(500).send("Error loading video");
      });
      res.setHeader("Content-Type", "video/mp4");
      remoteFileStream.pipe(res);
    });
  });
  conn.connect(sshConfig);
});

app.listen(5000, () => {
  console.log("Viewer service listening on port 5000");
});
