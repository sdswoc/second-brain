require("dotenv").config();

// All packages import
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");

// Import routes
const isLoggedIn = require("./routes/isLoggedIn");
// const expressLayouts = require("express-ejs-layouts");

// DB connection
mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true }, () => {
  console.log(`Database Connected!`);
});

const db = mongoose.connection;

// Middlewares
app.use(cookieParser());

app.use(
  session({
    name: process.env.SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      name: process.env.COOKIE_NAME,
    },
    store: MongoStore.create({
      mongoUrl: process.env.DB_STRING,
      ttl: 14 * 24 * 60 * 60, // Time to live
    }),
  })
);

app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "public"));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/layout");

// Route Handlers
app.use("/auth", require("./routes/auth")); // Authorization Routes
app.use("/", isLoggedIn, require("./routes/index"));
app.use("/notes", isLoggedIn, require("./routes/notes"));
app.use("/extension", require("./api/extensionHandler"));

// Run server
app.listen(3000, () => {
  console.log(`Server is up...`);
});
