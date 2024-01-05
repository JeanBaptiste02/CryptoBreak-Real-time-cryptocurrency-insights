const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const UserRoutes = require("./routes/routes");
const CoinRoutes = require("./routes/routes");
const CryptoRoutes = require("./routes/routes");
const MessageRoutes = require("./routes/routes");

const app = express();
const port = 4000;

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
app.use("/api/users", UserRoutes);
app.use("/api/crypto", CryptoRoutes);
app.use("/api/coins", CoinRoutes);
app.use("/messages", MessageRoutes);
module.exports = app;
