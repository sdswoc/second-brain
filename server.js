// Import all dependencies
const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// const cookieParser = require("cookie-parser");
const ejs = require("ejs");
const bcrypt = require("bcrypt");
const session = require("express-session");
const mongoose = require("mongoose");
const app = express();
const User = require("./models/user");
// const indexRouter = require("./routes/index");
require("dotenv").config();

// Import all Middlewares
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect(
  process.env.LOCAL_DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to database!");
  }
);

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

// PassportJS setup
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, { message: "Incorrect username" });
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) return done(err);
        if (res === false) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      });
    });
  })
  );

const port = process.env.PORT || 4000;

function isLoggedIn(req,res,next){
  if (req.isAuthenticated()) return next();
  res.redirect('/login')
}

app.use("/",isLoggedIn, require("./routes/index"));

app.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});
