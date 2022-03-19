const jwt = require("jsonwebtoken");

const hasToken = (req, res, next) => {
  const req_token = req.header("auth-token");
  if (!req_token) return res.status(401).send("Access Denied!");
  try {
    const verified = jwt.verify(req_token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = hasToken;
