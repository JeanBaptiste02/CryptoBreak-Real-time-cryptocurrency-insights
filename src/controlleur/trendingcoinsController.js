const axios = require("axios");
const Coin = require("../models/trendingCoin");

exports.fetchCoinsTrendings = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=EUR&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h"
    );

    const trendingdata = response.data.map((coin) => ({
      name: coin.name,
      image: coin.image,
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      total_volume: coin.total_volume,
    }));

    await Coin.insertMany(trendingdata);

    res.status(200).json(trendingdata); // Afficher les données
  } catch (error) {
    if (error.response && error.response.status === 429) {
      const storedData = await Coin.find();
      res.status(200).json(storedData);
    } else {
      console.error(
        "Erreur lors de la récupération et du stockage des données en tendances :",
        error
      );
      res
        .status(500)
        .json({ error: "Erreur interne du serveur", details: error.message });
    }
  }
};
