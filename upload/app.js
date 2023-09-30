const express = require("express");
const mysql = require("mysql2");
const bodyParser = require('body-parser');
const fs = require('fs');
const { Client } = require('ssh2');
const multer = require('multer');

const app = express();
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(express.static('public'));

const upload = multer({
	limits: { fileSize: 100 * 1024 * 1024 },
	dest: '/tmp/' 
});

const pool = mysql.createPool({
  connectionLimit: 10,
  host: '34.121.93.222',
  user: 'root',
  password: 'password',
  database: 'video_streaming'
});

const sshConfig = {
  host: '34.168.79.180',
  port: 22,
  username: 'fileuser',
  password: 'fileuser'
}

app.post("/upload/upload_file", upload.single('file'), (req, res) => {
  const file = req.file
  const filename = file.originalname;
  const video_path = "/mnt/data/" + filename

  pool.query('INSERT INTO video_library (video_title, video_path) VALUES (?, ?)', [filename, video_path ], (error, results, fields) => {
    if (error) throw error;
    
    const conn = new Client();
    conn.on('ready', () => {
      console.log('SSH Connection ready');
      conn.sftp((err, sftp) => {
        if (err) {
          console.error('Error creating SFTP connection', err);
          res.status(500).send('Error uploading file');
          return;
        }
        const remotePath = '/mnt/data/' + filename;
        const localFileStream = fs.createReadStream(file.path);
        const remoteFileStream = sftp.createWriteStream(remotePath);
        remoteFileStream.on('close', () => {
          console.log(`File uploaded to remote server: ${remotePath}`);
          res.redirect('/upload');
        });
        localFileStream.pipe(remoteFileStream);
      });
    });
    conn.connect(sshConfig);
  });
});

app.get("/upload", (req, res) => {
  res.sendFile(__dirname + "/public/upload.html", (err) => {
    if (err) {
      console.error("Error displaying upload page:", err);
    }
    else {
      console.log("Displaying upload page successfully!");
    }
  });
});

app.listen(4000, () => {
  console.log("Upload service listening on port 4000");
});

