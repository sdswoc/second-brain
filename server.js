const express = require("express");
const mongoose=require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
// app.use("/", express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());

app.post("/api/register", (req, res) => {
  console.log(req.body);
  res.send({ status: "ok" });
});
