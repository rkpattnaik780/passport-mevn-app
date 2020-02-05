var express = require("express");
var router = express.Router();
var passport = require("passport");
let { generateToken, tokenList } = require("../controllers/token_generator");

// To return the user data to the client
router.get("/check", (req, res) => {
  console.log("user - " + req.user);
  console.log(req.session.passport);
  if (req.user === undefined) {
    res.json({});
  } else {
    res.set("x-auth-token", req.session.token || "Not authorised");
    res.set("refresh-token", req.session.refreshToken || "Not authorised");
    res.json({
      user: req.user
    });
  }
});

// Navigating to auth/github provides us with option to sign in via github
router.get("/github", passport.authenticate("github"));

// The redirect url
router.get(
  "/github/redirect",
  passport.authenticate("github", { failureRedirect: "/" }),
  generateToken
);

// The API to log out, it clears req.user
router.get("/logout", function(req, res, next) {
  req.logout();
  delete tokenList[req.session.refreshToken];
  req.session = {};
  res.json({ msg: "Logged out", tokenlist: tokenList });
});

module.exports = router;
