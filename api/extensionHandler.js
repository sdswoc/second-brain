const router = require("express").Router();
const Note = require("../models/Notes");

router.get("/newNote", (req, res, next) => {
  res.send("Hey");
  console.log(req);
});

router.post("/newNote", async (req, res, next) => {
  try {
    const userName = req.session.userId;

    if (req.session.userId) {
      const note = await new Note({
        noteId: userName,
        note: req.body.note,
      });
      await note.save();
    } else {
      res.redirect("http://localhost:3000/auth/login");
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/auth", (req, res, next) => {
  if (req.header.authCookie !== document.cookie.authCookie) {
  }
});

module.exports = router;
