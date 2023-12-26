const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signin = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
        name: req.body.name,
        role: req.body.role,
        defaultCurrency: req.body.defaultCurrency,
        cryptocurrencies: req.body.cryptocurrencies,
        keywords: req.body.keywords,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((err) => res.status(400).json({ error: err }));
    })
    .catch((error) => res.status(500).json({ error }));
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

    // Vérifiez si l'utilisateur tente de mettre à jour le rôle
    if (req.body.role) {
      return res.status(403).json({
        error: "Vous n'avez pas les autorisations nécessaires pour mettre à jour le rôle",
      });
    }

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
    console.error("Erreur lors de la mise à jour du profil de l'utilisateur :", error);
    res.status(500).json({
      error: "Erreur interne du serveur lors de la mise à jour du profil",
      details: error.message,
    });
  }
};
