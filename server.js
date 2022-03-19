// All packages import
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");

require("dotenv").config();

// Import routes
const isLoggedIn = require("./routes/isLoggedIn");

// DB connection
mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true }, () => {
  console.log(`Database Connected!`);
});

// Middlewares
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     saveUninitialized: false,
//     resave: false,
//     store: MongoStore.create({
//       mongoUrl: process.env.DB_STRING,
//       ttl: 14*24*60*60
//     }),
//   })
// );

app.use(
  session({
    name: process.env.SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(express.json());
app.use("/", require("./routes/auth"));
app.get("/posts", isLoggedIn, (req, res) => {
  res.send("You have the access");
});

// Run server
app.listen(3000, () => {
  console.log(`Server is up...`);
});
