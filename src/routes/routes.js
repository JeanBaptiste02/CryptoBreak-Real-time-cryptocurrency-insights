const express = require("express");
const router = express.Router();

const Userctrl = require("../controlleur/userControlleur");
const CoinCtrl = require("../controlleur/coinController");

router.post("/login", Userctrl.login);

router.post("/register", Userctrl.signin);

router.post("/logout", Userctrl.logout);

router.get("/fetch-coins", CoinCtrl.fetchCoins);

module.exports = router;
