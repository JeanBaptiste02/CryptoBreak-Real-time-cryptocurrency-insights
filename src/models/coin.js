const mongoose = require("mongoose");

const coinSchema = new mongoose.Schema({
  id: String,
  symbol: String,
  name: String,
  current_price: Number,
  market_cap: Number,
  total_volume: Number,
  high_24h: Number,
  low_24h: Number,
  price_change_percentage_24h: Number,
  circulating_supply: Number,
  ath: Number,
  ath_date: Date,
  atl: Number,
  atl_date: Date,
  last_updated: Date,
});

const Coin = mongoose.model("Coin", coinSchema);

module.exports = Coin;
