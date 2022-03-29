const router = require("express").Router();
const bcrypt = require("bcrypt");
const { registerValidation, loginValidation } = require("../validation");

const User = require("../models/User");
const { is } = require("express/lib/request");

// GET Request for Login and Register
router.get("/login", (req, res) => {
  if (req.session.userId) return res.redirect("/");
  res.render("auth/login");
});
router.get("/register", (req, res) => {
  if (req.session.userId) return res.redirect("/");
  res.render("auth/register");
});

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
    res.redirect("/auth/login");
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

  req.session.userId = user._id;
  res.redirect("/");
  // res.redirect("/");
  // res.send("logged in");
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.redirect("/");
    res.clearCookie(process.env.SESSION_NAME);
    res.redirect("/auth/login");

    // res.redirect('/auth/login')
  });
});

module.exports = router;
