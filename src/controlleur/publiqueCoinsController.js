const axios = require("axios");
const Coin = require("../models/publiqueCoins");
const Crypto = require("../models/cryptos");

function makeFirstLetterLowerCase(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

function makeListFirstLetterLowerCase(list) {
  return list.map((element) => makeFirstLetterLowerCase(element));
}

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

    // Vous pouvez maintenant utiliser les données de response.data
    console.log(response.data);

    // Traitement des données et envoi de la réponse au client
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Erreur lors de la récupération des cryptos :", error);
    res
      .status(500)
      .json({ error: "Erreur interne du serveur", details: error.message });
  }
};
