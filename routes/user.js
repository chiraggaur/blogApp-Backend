var express = require("express");
var router = express.Router();
var auth = require("../middlewares/authorize");
var Users = require("../controllers/auth");

/* GET home page. */
// router.get("/signup", Users.listAllUsers);
router.post("/signup", Users.signUpNewUser);
router.post("/signin", Users.signInUser); // make post request from axios now to get user data
router.get("/signin/protected", auth.verifyToken, Users.currentUser); // get current user
router.post("/logout", auth.verifyToken, Users.logout); // doubt
router.get("/:username", auth.verifyToken, Users.findUser); // auth optional
// below both route pending schema also need to insert later on
router.post("/:username/follow", auth.verifyToken, Users.findUser); // follow user
router.delete("/:username", auth.verifyToken, Users.findUser); // unfollow user
module.exports = router;
