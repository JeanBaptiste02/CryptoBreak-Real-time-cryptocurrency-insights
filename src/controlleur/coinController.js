const axios = require("axios");
const Coin = require("../models/coin");

let lastUpdateTimestamp = 0;

exports.fetchCoins = async (req, res) => {
  try {
    const currentTime = new Date().getTime();
    const oneHourInMillis = 60 * 60 * 1000;

    if (currentTime - lastUpdateTimestamp < oneHourInMillis) {
      const storedData = await Coin.find();
      res.status(200).json(storedData);
      return;
    }

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

    await Coin.deleteMany();

    const selectedData = response.data.map((coin) => ({
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      image: coin.image,
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      market_cap_rank: coin.market_cap_rank,
      market_cap_change_24h: coin.market_cap_change_24h,
      market_cap_change_percentage_24h: coin.market_cap_change_percentage_24h,
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

    lastUpdateTimestamp = currentTime;

    res.status(200).json(selectedData);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération et du stockage des données :",
      error
    );
    res
      .status(500)
      .json({ error: "Erreur interne du serveur", details: error.message });
  }
};
