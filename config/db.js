const express = require("express");
const mongoose = require("mongoose");
const app = express();

const db_string = process.env.DB_STRING;
const connection_options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connection = mongoose.createConnection(
  db_string,
  connection_options,
  () => {
    console.log(`Database connected!`);
  }
);

exports.connection = connection;
