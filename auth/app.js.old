const express = require("express");
const bp = require("body-parser");

const app = express();
const users = {
  "tamim": "tamim",
  "daryush": "daryush",
  "peter": "peter"
};

// const authenticate = (req, res, next) => {
//   if (req.body === undefined) {
//     return res.status(401).send("UNAUTHORIZED!!!");
//   }

//   if (req.body.username === undefined || req.body.password === undefined) {
//     return res.status(401).send("UNAUTHORIZED!!!");
//   }

//   const username = req.body.username;
//   const password = req.body.password;
//   if (users[username] !== password) {
//     return res.status(401).send("UNAUTHORIZED!!!");
//   }
//   else {
//     res.sendStatus(200);
//   }
// };

// app.use(function(req, res, next) {
//     if (req.method === 'OPTIONS') {
//       res.header('Access-Control-Allow-Origin', '*');
//       res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
//       res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//       res.status(201).send();
//     } else if (req.method === 'POST') {
//       res.header('Access-Control-Allow-Origin', '*');
//       res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
//       res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//     }
//     else {
//       next();
//     }
//   });  

app.use(express.json());
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
// app.use(authenticate);
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post("/login", async (req, res) => {
  const body = await req.body;

  if (body === undefined) {
    return res.status(401).send("UNAUTHORIZED!!!");
  }

  if (body.username === undefined || body.password === undefined) {
    return res.status(401).send("UNAUTHORIZED!!!");
  }

  const username = body.username;
  const password = body.password;
  if (users[username] !== password) {
    return res.status(401).send("UNAUTHORIZED!!!");
  }
  else {
    return res.status(200).send("Authorized");
  }
});

app.listen(3000, () => {
  console.log("Auth service listening on port 3000");
});
