const { protect } = require("../middleware/authmiddleware"); // Still wrong export name "protect", wait. I should fix both.
// actually I should replace protect with auth.

let express = require("express");
const { login, signup, resume, getjobs, appliedjobs, applyjob, getresume } = require("../controllers/userController");
const { auth } = require("../middleware/authmiddleware");
const { upload } = require("../middleware/uploadmiddleware");
let userRoutes = express.Router();

userRoutes.post("/login", login);
userRoutes.post("/signup", signup);
userRoutes.post("/resume", auth, upload.single("resume"), resume);
userRoutes.get("/jobs", getjobs);
userRoutes.get("/applications", auth, appliedjobs);
userRoutes.post("/apply", auth, applyjob);
userRoutes.get("/resume", auth, getresume);

module.exports = { userRoutes };