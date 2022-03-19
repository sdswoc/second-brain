// All packages import
const express = require("express");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();

// Import routes
const hasToken=require('./routes/verifyToken')

// DB connection
mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true }, () => {
  console.log(`Database Connected!`);
});

// Middlewares
app.use(express.json());
app.use('/',require('./routes/auth'))
app.get('/posts',hasToken,(req,res) =>{
  res.send('You have the access')
})

// Run server
app.listen(3000, () => {
  console.log(`Server is up...`);
});
