var express = require("express");
var router = express.Router();
var auth = require("../middlewares/authorize");
var Users = require("../controllers/auth");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/Images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
// const upload = multer({ dest: "public/Images" });

/* GET home page. */
// router.get("/signup", Users.listAllUsers);
router.post("/signup", upload.single("imageUrl"), Users.signUpNewUser);
router.post("/signin", Users.signInUser); // make post request from axios now to get user data
router.get("/signin/protected", auth.verifyToken, Users.currentUser); // get current user
router.post("/logout", auth.verifyToken, Users.logout); // doubt
router.get("/:username", auth.verifyToken, Users.findUser); // auth optional
// below both route pending schema also need to insert later on
router.post("/:username/follow", auth.verifyToken, Users.findUser); // follow user
router.delete("/:username", auth.verifyToken, Users.findUser); // unfollow user
module.exports = router;
