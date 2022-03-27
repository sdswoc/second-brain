const router = require("express").Router();

router.get("/newNote", (req, res, next) => {
  res.send("Hey");
  console.log(req);
});

router.post("/newNote", (req, res, next) => {
  res.send("POST for noteCreation is working");
});

module.exports = router;
