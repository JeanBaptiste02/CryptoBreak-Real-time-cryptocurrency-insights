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
      vs_currency: "EUR",
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

exports.getAllCrypto = async (req, res, next) => {
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

    res.status(200).json(selectedData); // Afficher les données
  } catch (error) {
    if (error.response && error.response.status === 429) {
      res.status(400).json({ error: "erreur dans le nombre de requetes" });
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

exports.insertCrypto = async (req, res) => {
  try {
    const { name } = req.params;

    // Vérifier si la crypto existe déjà
    const existingCrypto = await Crypto.findOne({ name });

    if (existingCrypto) {
      return res.status(400).json({ error: "La crypto existe déjà." });
    }

    // Créer un nouvel enregistrement Crypto
    const newCrypto = new Crypto({
      name,
    });

    // Enregistrer dans la base de données
    const savedCrypto = await newCrypto.save();

    res.status(201).json(savedCrypto);
  } catch (error) {
    console.error("Erreur lors de l'insertion de la crypto :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

exports.deleteCrypto = async (req, res) => {
  try {
    const { id, name } = req.params;

    // Vérifier si la crypto existe
    const existingCrypto = await Crypto.findOne({ name });

    if (!existingCrypto) {
      return res.status(404).json({ error: "La crypto n'existe pas." });
    }

    // Supprimer la crypto de la base de données
    await Crypto.deleteOne({ name });

    res.status(200).json({ message: "La crypto a été supprimée avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression de la crypto :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};
