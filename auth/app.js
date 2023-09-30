const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();

// Configure MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'mysql',
  user: 'root',
  password: 'password',
  database: 'video_streaming'
});

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Login endpoint
app.post('/auth/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Query the database to check if the username and password are correct
  pool.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], (error, results, fields) => {
    if (error) throw error;

    if (results.length > 0) {
      res.redirect("/upload");
    } else {
      // Login failed
      res.redirect('/auth');
    }
  });
});

// Sign up endpoint
app.post('/auth/signup', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Insert new user into the database
  pool.query('INSERT INTO user (username, password) VALUES (?, ?)', [username, password], (error, results, fields) => {
    if (error) throw error;

    // Redirect back to the login page
    res.redirect('/auth');
  });
});

// Render login page
app.get('/auth', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// Render sign up page
app.get('/auth/signup', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

