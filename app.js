const User = require("./model/user");
const express=require("express");
const app=express();

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

// Register
app.post("/register", async (req, res) => {
  // Register logic
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!(email && password && first_name && last_name)) {
      console.error("All Inputs are required");
    }
    const oldUser = await User.findOne({ email });
    if (olduser) {
      return res.status(409).send("User already exists");
    }

    // Encrypt User Password
    encryptedUserPassword = await bcrypt.hash(password, 10);

    // Create User in our database
    const user = await User.create({
      first_name: firstName,
      last_name: lastName,
      email: email.toLowerCase(), //sanitize
      password: encryptedUserPassword,
    });

    // Create Token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "5h",
      }
    );

    // save user token
    user.token = token;

    //return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

// Login

app.post("/login", (req, res) => {
  // Login logic
});
