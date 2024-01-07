const express = require("express");
const mongoose = require("mongoose");
require("./controlleur/auth_google");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const UserRoutes = require("./routes/users-routes");
const CoinRoutes = require("./routes/crypto-routes");
const CryptoRoutes = require("./routes/crypto-routes");
const MessageRoutes = require("./routes/messages-routes");
const ArticleRoutes = require("./routes/articles-routes");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const app = express();
const port = 4000;

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google </a>');
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure",
  })
);

app.get("/auth/google/success", (req, res) => {
  if (req.isAuthenticated()) {
    const userEmail = encodeURIComponent(
      req.user.email || "Email not available"
    );

    // Créez le token avec les informations nécessaires
    const token = jwt.sign(
      { email: req.user.email, userId: req.user._id, role: req.user.role },
      "844f4b3bf504d6511e1c147ce9e5895233783bceb34dad9081ba3e0f92a376b8",
      { expiresIn: "1h" }
    );

    // Ajoutez le token dans le cookie
    res.cookie("token", token, { maxAge: 3600000 }); // maxAge en millisecondes (1 heure dans cet exemple)
    res.clearCookie("connect.sid");

    // Redirigez l'utilisateur avec le token dans l'URL
    res.redirect(`http://localhost:4200`);
  } else {
    res.status(401).send("User not authenticated");
  }
});

// Connexion à la base de données MongoDB
mongoose.connect(
  "mongodb+srv://jeanbaptistedamodarane:c'estmonmotdepassededb@cluster0.btolbk4.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on(
  "error",
  console.error.bind(console, "Erreur de connexion à la base de données :")
);
db.once("open", () => {
  console.log("Connexion réussie à la base de données MongoDB");
});

app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/users", UserRoutes);
app.use("/crypto", CryptoRoutes);
app.use("/coins", CoinRoutes);
app.use("/messages", MessageRoutes);
app.use("/articles", ArticleRoutes);
module.exports = app;
