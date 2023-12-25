const express = require("express");
const router = express.Router();

const Userctrl = require("../controlleur/userControlleur");
const CoinCtrl = require("../controlleur/coinController");
const TrendCoinCtrl = require("../controlleur/trendingcoinsController");
const { authenticate } = require("../authMiddleware/authMiddleware");

router.post("/login", Userctrl.login);

router.post("/register", Userctrl.signin);

router.post("/logout", authenticate, Userctrl.logout);

router.get("/profile", authenticate, Userctrl.getProfile);

router.get("/cryptos", CoinCtrl.fetchCoins);

router.get("/cryptos/id", TrendCoinCtrl.fetchCoinsTrendings);

module.exports = router;
