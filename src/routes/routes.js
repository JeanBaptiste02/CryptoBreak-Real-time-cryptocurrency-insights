// routes.js
const express = require("express");
const router = express.Router();

const UserCtrl = require("../controlleur/userControlleur");
const CoinCtrl = require("../controlleur/coinController");
const TrendCoinCtrl = require("../controlleur/trendingcoinsController");
const MessageCtrl = require("../controlleur/messageController");
const {
  authenticate,
  authorizeAdmin,
} = require("../authMiddleware/authMiddleware");

router.post("/login", UserCtrl.login);

router.post("/register", UserCtrl.signin);

router.post("/logout", authenticate, UserCtrl.logout);

router.get("/profile", authenticate, UserCtrl.getProfile);

router.put("/updateProfile", authenticate, UserCtrl.updateProfile);

router.put(
  "/updateRole",
  authenticate,
  authorizeAdmin,
  UserCtrl.updateUserRole
);

router.get("/cryptos", CoinCtrl.fetchCoins);

router.get("/cryptos/id", TrendCoinCtrl.fetchCoinsTrendings);

// Dans routes.js
router.get("/messages", MessageCtrl.getAllMessages);
router.post("/messages", MessageCtrl.createMessage);

module.exports = router;
