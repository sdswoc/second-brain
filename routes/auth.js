const router = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session").Session;
const MongoStore = require("connect-mongo");
const { registerValidation, loginValidation } = require("../validation");

const User = require("../models/User");
const { is } = require("express/lib/request");

// Register POST route
router.post("/register", async (req, res) => {
  // Validate Schema
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error);
  try {
    // Check if email is already registered

    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send("Email already registered");

    const usernameExists = await User.findOne({ _id: req.body.username });
    if (usernameExists) return res.status(400).send("Username not available");

    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await new User({
      _id: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    res.send(savedUser._id);
    console.log(`User saved to database!`);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login POST Route
router.post("/login", async (req, res) => {
  // Validate request body
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error);

  // Check if email or ?username is present in the DB
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email does not exist");
  console.log("Fine till email exists check");

  // Check for the user password
  const checkPassword = await bcrypt.compare(req.body.password, user.password);
  if (!checkPassword) return res.status(400).send("Password does not match");

  // Create session

  req.session.userId=user._id;
  res.send('Logged In!')
  // res.send("logged in");
});

module.exports = router;
