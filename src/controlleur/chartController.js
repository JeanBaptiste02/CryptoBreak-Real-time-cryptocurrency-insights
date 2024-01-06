const axios = require("axios");
const ChartData = require("../models/chartData");
const Coin = require("../models/coin");

const mapChartData = (chartData) => ({
  timestamp: chartData[0],
  value: chartData[1],
});

exports.getChartData = async (req, res) => {
  const { id, days } = req.params; // Assuming you get parameters from the request

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
      {
        params: {
          vs_currency: "eur",
          days: days,
        },
      }
    );

    const chartData = response.data;

    const coin = await Coin.findOne({ id: id });

    // Create a new Chart document and save it to the database
    const newChartEntry = new ChartData({
      coin: coin._id, // Assuming _id is the unique identifier of the Coin document
      days: days,
      timestamps: chartData.timestamps,
      prices: response.data.prices.map(mapChartData),
      market_caps: response.data.prices.map(mapChartData),
      total_volumes: response.data.prices.map(mapChartData),
    });

    await newChartEntry.save();

    res.status(200).json(response.data); // Return the chart data
  } catch (error) {
    console.error("Error fetching chart data:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
