const express = require("express");
const mongoose = require("mongoose");
const app = express();
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();

// Import Routes
const indexRouter = require("./routes/index");
// const homeRouter=require('/')

// Database Connection
mongoose.connect(process.env.MONGO_URI),()=>{console.log('Connected to Database!')};

const db = mongoose.connection;

db.on("error", error => {
  console.error(error);
});

db.once("open", () => {
  console.log("Database connected!");
});

// Middlewares
app.set("view-engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layouts", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

// Route Handlers
app.use("/", indexRouter);
// app.get('/home', ) \\

// Run server
app.listen(process.env.PORT || 3000);
