const express = require("express");
const router = express.Router();

const CoinCtrl = require("../controlleur/coinController");
const pubCoinCtrl = require("../controlleur/publiqueCoinsController");
const CryptoCtrl = require("../controlleur/cryptosController");
const TrendCoinCtrl = require("../controlleur/trendingcoinsController");

const ChartCtrl = require("../controlleur/chartController");

const {
  authenticate,
  authorizeAdmin,
} = require("../authMiddleware/authMiddleware");

router.get("/init", CryptoCtrl.inisialize);

router.get(
  "/cryptos/admin",
  authenticate,
  authorizeAdmin,
  CryptoCtrl.getCryptoInfoByName
);

router.post(
  "/crypto/:name",
  authenticate,
  authorizeAdmin,
  CryptoCtrl.insertCrypto
);

router.delete(
  "/crypto/:name",
  authenticate,
  authorizeAdmin,
  CryptoCtrl.deleteCrypto
);

router.get("/allcrypto", CryptoCtrl.getAllCrypto);

router.get("/cryptos", CoinCtrl.fetchCoins);

router.get("/cryptos/trend", TrendCoinCtrl.fetchCoinsTrendings);

router.get("/cryptos/:id/details/:days", ChartCtrl.getChartData);

router.get("/public/crypto", pubCoinCtrl.fetchCoins);

module.exports = router;
