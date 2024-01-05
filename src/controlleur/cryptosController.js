const Crypto = require("../models/cryptos");
const axios = require("axios");

exports.inisialize = async (req, res, next) => {
  try {
    // Faire une requête à l'API Coingecko
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "eur",
          order: "market_cap_desc",
          page: 1,
          sparkline: false,
        },
      }
    );

    // Extraire les noms des cryptos de la réponse
    const cryptoNames = response.data.map((crypto) => crypto.name);

    // Itérer sur la liste des noms et les insérer individuellement dans la base de données
    for (const cryptoName of cryptoNames) {
      await Crypto.findOneAndUpdate(
        { name: cryptoName },
        { $set: { name: cryptoName } },
        { upsert: true }
      );
    }

    console.log("Noms de cryptos mis à jour avec succès !");
    return res
      .status(200)
      .json({ message: "Noms de cryptos mis à jour avec succès !" });
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour des noms de cryptos :",
      error.message
    );
    return res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour des noms de cryptos." });
  }
};

exports.getCryptoInfoByName = async (req, res, next) => {
  try {
    // Récupérer les noms de cryptos depuis la base de données
    const cryptosFromDB = await Crypto.find({}, "name");

    // Extraire les noms des cryptos
    const cryptoNames = cryptosFromDB.map((crypto) => crypto.name);
    console.log(cryptoNames);

    if (cryptoNames.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun crypto trouvé dans la base de données." });
    }

    // Construire l'objet de paramètres pour la requête Coingecko
    const coingeckoParams = {
      vs_currency: "eur",
      order: "market_cap_desc",
      sparkline: false,
      names: cryptoNames.join(","), // Convertir les noms en une chaîne séparée par des virgules pour la requête Coingecko
    };

    // Construire l'URL de la requête Coingecko avec les paramètres spécifiés
    const coingeckoUrl = `https://api.coingecko.com/api/v3/coins/markets?${new URLSearchParams(
      coingeckoParams
    )}`;

    // Effectuer la requête à l'API Coingecko en utilisant node-fetch
    const response = await fetch(coingeckoUrl);
    const responseData = await response.json();

    res.status(200).json({ cryptos: responseData });
    next();
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations des cryptos :",
      error.message
    );
    res.status(500).json({
      message: "Erreur lors de la récupération des informations des cryptos.",
    });
    next(error);
  }
};
