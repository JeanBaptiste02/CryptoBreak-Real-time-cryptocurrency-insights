const express = require("express");
const router = express.Router();

const Userctrl = require("../controlleur/userControlleur");

router.post("/login", Userctrl.login);

router.post("/register", Userctrl.signin);

module.exports = router;
