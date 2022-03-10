const res = require("express/lib/response");
const mongoose = require("mongoose");
const mongoURI = 'mongodb+srv://akshitkg:WUgAtomtbFyTBPsW@cluster0.hldk2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const InitializeMongoSever = () => {
  try {
    mongoose.connect(mongoURI, () => {
      console.log("Connection successful");
    });
  } catch (e) {
    throw new Error("Connection failed");
  }
};
module.exports = InitializeMongoSever;