let express = require("express");
const { signup, login, uploadjob, getuploadedjobs, getapplicants, status, jobsVisibility } = require("../controllers/adminControllers");
const { recruiterAuth } = require("../middleware/recruitermiddleware");
let adminRoutes = express.Router();

adminRoutes.post("/signup", signup);
adminRoutes.post("/login", login);
adminRoutes.post("/job", recruiterAuth, uploadjob);
adminRoutes.get("/jobs", recruiterAuth, getuploadedjobs);
adminRoutes.get("/applications", recruiterAuth, getapplicants);
adminRoutes.patch("/status", recruiterAuth, status);
adminRoutes.post("/visibility", recruiterAuth, jobsVisibility);

module.exports = { adminRoutes };
