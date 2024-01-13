const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signin = async (req, res, next) => {
  try {
    // Vérifiez d'abord si l'e-mail existe déjà
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      // L'e-mail existe déjà, renvoyez une erreur
      return res.status(400).json({ error: "L'e-mail existe déjà." });
    }

    // L'e-mail n'existe pas, continuez avec la création de l'utilisateur
    const hash = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      email: req.body.email,
      password: hash,
      name: req.body.name,
      role: req.body.role,
      defaultCurrency: req.body.defaultCurrency,
      cryptocurrencies: req.body.cryptocurrencies,
      keywords: req.body.keywords,
    });

    await user.save();

    res.status(201).json({ message: "Utilisateur créé !" });
  } catch (err) {
    if (err.name === "ValidationError" && err.errors && err.errors.email) {
      // Erreur de validation, probablement due à l'absence d'un e-mail
      return res.status(400).json({ error: "L'e-mail est obligatoire." });
    }

    // Gestion d'autres erreurs
    console.error("Erreur lors de la création de l'utilisateur :", err);
    res.status(500).json({
      error: "Erreur interne du serveur lors de la création de l'utilisateur.",
    });
  }
};

exports.login = (req, res, next) => {
  const { email, password } = req.body.user;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Paire login/mot de passe incorrecte" });
      }

      bcrypt
        .compare(password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Paire login/mot de passe incorrecte" });
          }

          // Créez un token
          const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            "844f4b3bf504d6511e1c147ce9e5895233783bceb34dad9081ba3e0f92a376b8",
            { expiresIn: "24h" }
          );

          res.cookie("token", token, {
            httpOnly: true,
            secure: true,
          });

          res.status(200).json({
            token: token,
            message: "Authentification réussie",
          });
        })
        .catch((compareError) => {
          console.error(
            "Erreur lors de la comparaison des mots de passe :",
            compareError
          );
          res.status(500).json({
            error:
              "Erreur interne du serveur lors de la comparaison des mots de passe",
            details: compareError.message,
          });
        });
    })
    .catch((findError) => {
      console.error(
        "Erreur lors de la recherche de l'utilisateur :",
        findError
      );
      res.status(500).json({
        error:
          "Erreur interne du serveur lors de la recherche de l'utilisateur",
        details: findError.message,
      });
    });
};

exports.logout = (req, res) => {
  res.clearCookie("token");

  res.status(200).json({ message: "Déconnexion réussie" });
};

exports.getUserById = async (userId) => {
  try {
    const user = await User.findById(userId).select("-password").exec();
    return user;
  } catch (error) {
    throw error;
  }
};

exports.getProfile = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Token non fourni" });
  }

  jwt.verify(
    token,
    "844f4b3bf504d6511e1c147ce9e5895233783bceb34dad9081ba3e0f92a376b8",
    async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token non valide" });
      }

      try {
        // Utilisez la méthode getUserById pour récupérer l'utilisateur
        const user = await exports.getUserById(decoded.userId);

        // Retournez les informations du profil de l'utilisateur
        res.status(200).json({
          email: user.email,
          name: user.name,
          role: user.role,
          defaultCurrency: user.defaultCurrency,
          cryptocurrencies: user.cryptocurrencies,
          keywords: user.keywords,
        });
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur :",
          error
        );
        res.status(500).json({
          error:
            "Erreur interne du serveur lors de la récupération de l'utilisateur",
          details: error.message,
        });
      }
    }
  );
};

exports.getProfile = async (req, res) => {
  const userId = req.user.userId; // userId provient du token

  try {
    // Utilisez la méthode getUserById pour récupérer l'utilisateur
    const user = await exports.getUserById(userId);
    console.log(user);

    // Retournez les informations du profil de l'utilisateur
    res.status(200).json({
      email: user.email,
      name: user.name,
      role: user.role,
      defaultCurrency: user.defaultCurrency,
      cryptocurrencies: user.cryptocurrencies,
      keywords: user.keywords,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    res.status(500).json({
      error:
        "Erreur interne du serveur lors de la récupération de l'utilisateur",
      details: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  const userId = req.user.userId; // userId provient du token

  try {
    // Utilisez la méthode getUserById pour récupérer l'utilisateur
    const user = await exports.getUserById(userId);

    // Mettez à jour les champs du profil avec les nouvelles valeurs
    user.name = req.body.name || user.name;
    user.defaultCurrency = req.body.defaultCurrency || user.defaultCurrency;
    user.cryptocurrencies = req.body.cryptocurrencies || user.cryptocurrencies;
    user.keywords = req.body.keywords || user.keywords;

    // Sauvegardez les modifications dans la base de données
    await user.save();

    // Retournez les informations mises à jour du profil de l'utilisateur
    res.status(200).json({
      email: user.email,
      name: user.name,
      role: user.role,
      defaultCurrency: user.defaultCurrency,
      cryptocurrencies: user.cryptocurrencies,
      keywords: user.keywords,
      message: "Profil mis à jour avec succès",
    });
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour du profil de l'utilisateur :",
      error
    );
    res.status(500).json({
      error: "Erreur interne du serveur lors de la mise à jour du profil",
      details: error.message,
    });
  }
};

exports.updateUserRole = async (req, res) => {
  const userId = req.user.userId; // ID de l'utilisateur authentifié

  try {
    // Vérifiez si l'utilisateur authentifié est administrateur
    const authenticatedUser = await User.findById(userId);

    if (authenticatedUser.role !== "admin") {
      return res.status(403).json({
        error:
          "Vous n'avez pas les autorisations nécessaires pour accéder à cette ressource",
      });
    }

    // Récupérez l'ID de l'utilisateur cible à partir du corps de la requête
    const targetUserId = req.body.userId;
    console.log(targetUserId);

    // Utilisez la méthode getUserById pour récupérer l'utilisateur cible
    const targetUser = await exports.getUserById(targetUserId);
    console.log(targetUser);

    // Vérifiez si l'utilisateur cible existe
    if (!targetUser) {
      return res.status(404).json({
        error: "L'utilisateur cible n'a pas été trouvé",
      });
    }

    // Mettez à jour le rôle de l'utilisateur cible
    targetUser.role = req.body.role;

    // Sauvegardez les modifications dans la base de données
    await targetUser.save();

    // Retournez les informations mises à jour de l'utilisateur cible
    res.status(200).json({
      email: targetUser.email,
      name: targetUser.name,
      role: targetUser.role,
      message: "Rôle de l'utilisateur mis à jour avec succès",
    });
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour du rôle de l'utilisateur :",
      error
    );
    res.status(500).json({
      error:
        "Erreur interne du serveur lors de la mise à jour du rôle de l'utilisateur",
      details: error.message,
    });
  }
};

exports.updateProfilecrypto = async (req, res) => {
  const userId = req.user.userId;

  try {
    const userFromDB = await exports.getUserById(userId);

    if (!userFromDB) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Ajoutez la nouvelle crypto à la liste existante
    const newCrypto = req.body.cryptocurrencies;
    let cryptomodi = firstLetterToLowerCase(newCrypto);

    if (!userFromDB.cryptocurrencies.includes(newCrypto)) {
      userFromDB.cryptocurrencies.push(cryptomodi);
    }

    // Sauvegardez les modifications
    await userFromDB.save();

    res.status(200).json({ message: "Profil mis à jour avec succès." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil :", error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la mise à jour du profil." });
  }
};

exports.deleteProfilecrypto = async (req, res) => {
  const userId = req.user.userId;

  try {
    const userFromDB = await exports.getUserById(userId);

    if (!userFromDB) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Crypto-monnaie à supprimer
    const cryptoToRemove = req.body.cryptocurrencies.toLowerCase();

    // Vérifier si la crypto-monnaie existe dans la liste
    if (userFromDB.cryptocurrencies.includes(cryptoToRemove)) {
      // Supprimer la crypto-monnaie de la liste
      userFromDB.cryptocurrencies = userFromDB.cryptocurrencies.filter(
        (crypto) => crypto !== cryptoToRemove
      );

      // Sauvegardez les modifications
      await userFromDB.save();

      return res.status(200).json({
        message: "Crypto-monnaie supprimée avec succès.",
        cryptocurrencies: userFromDB.cryptocurrencies,
      });
    } else {
      return res.status(404).json({
        message: "Crypto-monnaie non trouvée dans la liste de l'utilisateur.",
      });
    }
  } catch (error) {
    console.error(
      "Erreur lors de la suppression de la crypto-monnaie :",
      error
    );
    res.status(500).json({
      message: "Erreur serveur lors de la suppression de la crypto-monnaie.",
    });
  }
};

function firstLetterToLowerCase(input) {
  console.log("Input before:", input);

  if (!input || input.length === 0) {
    return input;
  }

  if (Array.isArray(input)) {
    // Si c'est une liste, appliquer la transformation à chaque élément
    return input.map((item) => {
      if (typeof item === "string") {
        return item.charAt(0).toLowerCase() + item.slice(1);
      } else {
        return item; // Ne rien faire si l'élément n'est pas une chaîne
      }
    });
  } else if (typeof input === "string") {
    // Si c'est une chaîne, appliquer la transformation normalement
    return input.charAt(0).toLowerCase() + input.slice(1);
  } else {
    return input; // Si le type n'est ni une chaîne ni une liste, retourner tel quel
  }
}
