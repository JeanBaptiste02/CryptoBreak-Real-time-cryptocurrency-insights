const axios = require("axios");
const Coin = require("../models/coin");

exports.fetchCoins = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "EUR",
          order: "market_cap_desc",
          sparkline: false,
        },
      }
    );

    const selectedData = response.data.map((coin) => ({
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      image: coin.image,
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      total_volume: coin.total_volume,
      high_24h: coin.high_24h,
      low_24h: coin.low_24h,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      circulating_supply: coin.circulating_supply,
      ath: coin.ath,
      ath_date: coin.ath_date,
      atl: coin.atl,
      atl_date: coin.atl_date,
      last_updated: coin.last_updated,
    }));

    await Coin.insertMany(selectedData);

    res.status(200).json(selectedData); // Afficher les données
  } catch (error) {
    if (error.response && error.response.status === 429) {
      const storedData = await Coin.find();
      res.status(200).json(storedData);
    } else {
      console.error(
        "Erreur lors de la récupération et du stockage des données :",
        error
      );
      res
        .status(500)
        .json({ error: "Erreur interne du serveur", details: error.message });
    }
  }
};
