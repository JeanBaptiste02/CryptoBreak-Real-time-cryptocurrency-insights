const express = require("express");
const router = express.Router();

const Userctrl = require("../controlleur/userControlleur");
const CoinCtrl = require("../controlleur/coinController");
const TrendCoinCtrl = require("../controlleur/trendingcoinsController");

router.post("/login", Userctrl.login);

router.post("/register", Userctrl.signin);

router.post("/logout", Userctrl.logout);

router.get("/profile", Userctrl.getProfile);

router.get("/cryptos", CoinCtrl.fetchCoins);

router.get("/cryptos/id", TrendCoinCtrl.fetchCoinsTrendings);

module.exports = router;
