const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const express = require("express");
const expressApp = express();

const { API_PORT } = process.env;
const port =4001;

// Server Listening
expressApp.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});
