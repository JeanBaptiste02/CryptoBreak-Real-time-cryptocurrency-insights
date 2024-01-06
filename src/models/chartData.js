const mongoose = require("mongoose");

const chartSchema = new mongoose.Schema({
  coin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coin", // Assuming 'Coin' is the name of your Coin model
    required: true,
  },
  days: Number,
  timestamps: {
    type: Date,
    default: Date.now,
  },
  prices: [
    {
      timestamp: { type: Number, required: true },
      value: { type: Number, required: true },
    },
  ],
  market_caps: [
    {
      timestamp: { type: Number, required: true },
      value: { type: Number, required: true },
    },
  ],
  total_volumes: [
    {
      timestamp: { type: Number, required: true },
      value: { type: Number, required: true },
    },
  ],
});

const Chart = mongoose.model("Chart", chartSchema);

module.exports = Chart;
