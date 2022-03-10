const express = require("express");
const InitializeMongoSever = require("./config/db.config");
const app = express();

const port = process.env.PORT || 4000;

InitializeMongoSever();

// GET Routes
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/home", (req, res) => {
  res.send("This is home page.");
});


app.listen(port, () => {
  console.log(`Server up on Port ${port}...`);
});
