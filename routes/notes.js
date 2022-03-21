const router = require("express").Router();
const Note = require("../models/Notes");

router.get("/", (req, res) => {
  res.render("notes/notes");
});

router.post("/new", async (req, res) => {
  try {
    console.log("Try initiated");
    const newNote = await req.body.newNote;
    const id = await req.session.userId;
    const note = await new Note({
      noteId: id,
      note: newNote,
    });
    console.log("note constant created");
    await note.save();
    res.send("Note created successfully");
    console.log("Note saved successfully!");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
