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

          res.status(200).json({
            userId: user._id,
            token: "TOKEN",
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
