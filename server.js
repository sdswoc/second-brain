const express = require("express");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();

// DB connection
mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true }, () => {
  console.log(`Database Connected!`);
});



// Middlewares




// Run server
app.listen(3000, () => {
  console.log(`Server is up...`);
});
