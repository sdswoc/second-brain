require("dotenv").config();
const express = require("express");
const status = require("statuses");
const jwt = require("jsonwebtoken");
const app = express();

const posts = [
  {
    username: "Anne Marie",
    title: "Rockabye",
  },
  {
    username: "Sandra",
    title: "Chameleon",
  },
];

app.get("/posts", (req, res) => {
  res.json(posts);
  res.json(status);
});

app.post("/login", (req, res) => {
  // Authentication of user

  const username = req.body.username;
  const user = { name: username };

  const accessToken = process.env.ACCESS_TOKEN_SECRET;
  res.json({ accessToken: accessToken });
});

app.listen(3000);
