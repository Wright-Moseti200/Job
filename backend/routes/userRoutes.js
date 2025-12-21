let express = require("express");
const { login, signup } = require("../controllers/userController");
let userRoutes = express.Router();

userRoutes.post("/login",login);
userRoutes.post("/signup",signup);

module.exports={userRoutes};