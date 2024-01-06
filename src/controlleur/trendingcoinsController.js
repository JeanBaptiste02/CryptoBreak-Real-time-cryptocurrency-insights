const axios = require("axios");
const Coin = require("../models/trendingCoin");

let lastUpdateTimestamp = 0;

exports.fetchCoinsTrendings = async (req, res) => {
  try {
    const currentTime = new Date().getTime();
    const oneHourInMillis = 60 * 60 * 1000;

    if (currentTime - lastUpdateTimestamp < oneHourInMillis) {
      const storedData = await Coin.find();
      res.status(200).json(storedData);
      return;
    }

    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=EUR&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h"
    );

    await Coin.deleteMany();

    const trendingData = response.data.map((coin) => ({
      name: coin.name,
      image: coin.image,
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      total_volume: coin.total_volume,
    }));

    await Coin.insertMany(trendingData);

    lastUpdateTimestamp = currentTime;

    res.status(200).json(trendingData);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération et du stockage des données en tendances :",
      error
    );
    res
      .status(500)
      .json({ error: "Erreur interne du serveur", details: error.message });
  }
};
