const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const UserRoutes = require("./routes/routes");

const app = express();
const port = 4000;

// Connexion à la base de données MongoDB
mongoose.connect(
  "mongodb+srv://jeanbaptistedamodarane:c'estmonmotdepassededb@cluster0.btolbk4.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Gestion des erreurs de connexion
const db = mongoose.connection;
db.on(
  "error",
  console.error.bind(console, "Erreur de connexion à la base de données :")
);
db.once("open", () => {
  console.log("Connexion réussie à la base de données MongoDB");
});

// Définissez vos routes ici...

app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});

app.use(bodyParser.json());
app.use("/api/users", UserRoutes);
module.exports = app;
