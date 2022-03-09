const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

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

app.listen(port, () => {
  console.log(`Server up on Port ${port}...`);
});
