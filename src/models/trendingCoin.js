const mongoose = require("mongoose");

const coinSchema = new mongoose.Schema({
  name: String,
  image: String,
  current_price: Number,
  market_cap: Number,
  total_volume: Number,
});

const Coin = mongoose.model("Trendings", coinSchema);

module.exports = Coin;
