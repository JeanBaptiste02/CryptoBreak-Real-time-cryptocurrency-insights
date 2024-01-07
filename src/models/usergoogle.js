const mongoose = require("mongoose");

const googleUserSchema = new mongoose.Schema({
  googleId: String,
  email: String,
});

const GoogleUserModel = mongoose.model("GoogleUser", googleUserSchema);

module.exports = GoogleUserModel;
