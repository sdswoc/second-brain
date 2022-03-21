const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  noteId: {
    //   type: "string",
    type: String
  },
  note: {
      type: String,
    // required: true,
  },
});

module.exports=mongoose.model('Notes', notesSchema);
