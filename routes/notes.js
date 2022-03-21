const router = require("express").Router();
const Notes = require("../models/Notes");
const Note = require("../models/Notes");

router.get("/", async (req, res) => {
  try {
    await Note.find({ noteId: req.session.userId }, (err, allUserNotes) => {
      if (err) {
        return res
          .status(404)
          .send("Something went wrong in fetching from database");
      }
      console.log(allUserNotes);
      res.render("notes/notes",{allUserNotes: allUserNotes});
    });
  } catch (err) {
    console.log(err);
  }
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
    res.redirect("/notes");
    console.log("Note saved successfully!");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
