const express = require("express");
const router = express.Router();

const Userctrl = require("../controlleur/userControlleur");

router.post("/login", Userctrl.login);

router.post("/register", Userctrl.signin);

router.post("/logout", Userctrl.logout);

module.exports = router;
