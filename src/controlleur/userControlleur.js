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
            { userId: user._id, email: user.email },
            "844f4b3bf504d6511e1c147ce9e5895233783bceb34dad9081ba3e0f92a376b8",
            { expiresIn: "24h" } // Optionnel : définissez une expiration pour le cookie
          );

          // Ajoutez le token dans un cookie
          res.cookie("token", token, {
            httpOnly: true,
            secure: true, // Activez ceci si vous utilisez HTTPS
            // sameSite: "None", // Activez ceci si vous souhaitez autoriser les cookies cross-site (CSRF)
          });

          // Répondez avec succès
          res.status(200).json({
            userId: user._id,
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
  // Supprimez le cookie en fixant une date d'expiration passée
  res.clearCookie("token");

  // Répondez avec succès
  res.status(200).json({ message: "Déconnexion réussie" });
};
