const axios = require("axios");
const Coinpub = require("../models/publiqueCoins");
const Crypto = require("../models/cryptos");

function makeFirstLetterLowerCase(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

function makeListFirstLetterLowerCase(list) {
  return list.map((element) => makeFirstLetterLowerCase(element));
}

let lastUpdateTimestamp = 0;

exports.fetchCoins = async (req, res) => {
  try {
    // Récupérer les noms de cryptos depuis la base de données
    const cryptosFromDB = await Crypto.find({}, "name");

    // Extraire les noms des cryptos
    const cryptoNames = cryptosFromDB.map((crypto) => crypto.name);

    if (cryptoNames.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun crypto trouvé dans la base de données." });
    }

    const modifiedList = makeListFirstLetterLowerCase(cryptoNames);

    const currentTime = new Date().getTime();
    const oneHourInMillis = 60 * 1000;

    // if (currentTime - lastUpdateTimestamp < oneHourInMillis) {
    //   const storedData = await Coinpub.find();
    //   res.status(200).json(storedData);
    //   return;
    // }

    // Construire l'objet de paramètres pour la requête Coingecko
    const coingeckoParams = {
      vs_currency: "EUR",
      order: "market_cap_desc",
      sparkline: false,
      ids: modifiedList.join(","), // Convertir les noms en une chaîne séparée par des virgules pour la requête Coingecko
    };

    // Faire la requête à l'API Coingecko
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      { params: coingeckoParams }
    );

    await Coinpub.deleteMany();
    // Vous pouvez maintenant utiliser les données de response.data
    // console.log(response.data);

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

    await Coinpub.insertMany(selectedData);

    lastUpdateTimestamp = currentTime;

    // Traitement des données et envoi de la réponse au client
    res.status(200).json(selectedData);
  } catch (error) {
    console.error("Erreur lors de la récupération des cryptos :", error);
    res
      .status(500)
      .json({ error: "Erreur interne du serveur", details: error.message });
  }
};
