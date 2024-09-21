
const express = require("express");
const handleRegisterUser  = require("../controllers/register");
const handleLoginUser = require("../controllers/login");
const handleLogoutUser = require("../controllers/logout");
const upload = require("../middlewares/profileUpload");

const authRouter = express.Router();


authRouter.post("/register", upload.single('profileImage'),handleRegisterUser)
authRouter.post("/login",handleLoginUser)
authRouter.post("/logout",handleLogoutUser)



module.exports = authRouter