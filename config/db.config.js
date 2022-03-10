const res = require("express/lib/response");
const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://akshitkg:WUgAtomtbFyTBPsW@cluster0.hldk2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const connect = () => {
  try {
    mongoose.connect(mongoURI, { useNewUrlParser: true });
    conn = mongoose.connection;
  } catch (e) {
    throw new Error("Connection failed");
  }
};
module.exports = connect;
