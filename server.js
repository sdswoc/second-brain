const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");
const cors=require("cors");
const conn = require("./config/db.config");
const session = require("express-session");
const MongoStore = require("connect-mongo")[session];
const User = require("./models/User");
const app = express();
var conn; // Mongoose Connection
const port = process.env.PORT || 4000;

// Initialize mongo server
// InitializeMongoSever(conn);

// Middleware
app.use(bodyParser.json());
app.use(cors());

// GET Routes start

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

// GET Routes END

// Conn settings
conn.on("connected", (req, res) => {
  console.log("MongoDB Connected");
});

conn.on("error", (err) => {
  if (err) {
    console.log(err);
  }
});

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: conn,
    }),
  })
);

app.listen(port, () => {
  console.log(`Server up on Port ${port}...`);
});
