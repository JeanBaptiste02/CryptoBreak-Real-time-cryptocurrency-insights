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
          per_page: 100,
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
