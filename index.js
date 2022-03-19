const express = require("express");
const jwt = require("jsonwebtoken");
const cron = require("node-cron");

const app = express();
app.use(express.json());

var user = {
  name: "admin",
  password: "admin",
};

app.post("/", (req, res) => {
  if (user.name === req.body.name && user.password === req.body.password) {
    jwt.sign(user, "secretKey", (err, token) => {
      res.status(200).json({
        AccessToken: token,
      });
    });
  } else {
    res.status(500);
  }
});

const tokenVerify = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(500);
  }
};

app.get("/validate", tokenVerify, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, encoded) => {
    if (err) {
      res.json(false);
    } else {
      cron.schedule("* * * * *", () => {
        let time = new Date(Date.now()).toString();
        console.log("The is date " + time);
      });
      res.json(true);
    }
  });
});

app.listen(5000, () => console.log("server running"));
