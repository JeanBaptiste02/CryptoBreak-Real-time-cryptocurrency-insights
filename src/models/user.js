const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "utilisateur"],
    default: "utilisateur",
  },
  defaultCurrency: { type: String, default: "EUR" }, // Devise par défaut
  cryptocurrencies: [{ type: String }], // Liste de crypto-monnaies
  keywords: [{ type: String }], // Liste de mots-clés
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
