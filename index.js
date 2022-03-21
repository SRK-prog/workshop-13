const express = require("express");
const jwt = require("jsonwebtoken");
const cmaster = require("cron-master");
const path = require("path");

const instance = cmaster.getInstance();

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
      instance.loadJobs(path.join(__dirname, "./Jobs"), function (err, jobs) {
        if (err) {
          throw err;
        } else {
          instance.startJobs();
        }
      });
      res.json(true);
    }
  });
});

app.listen(5000, () => console.log("server running"));
