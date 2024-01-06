const axios = require("axios");
const ChartData = require("../models/chartData");
const Coin = require("../models/coin");

const mapChartData = (chartData) => ({
  timestamp: chartData[0],
  value: chartData[1],
});

exports.getChartData = async (req, res) => {
  const { id, days } = req.params;

  try {
    const coin = await Coin.findOne({ id: id });

    const existingChartData = await ChartData.findOne({
      coin: coin._id,
      days: days,
    });

    if (existingChartData) {
      // Si des données de graphique existent, les renvoyer directement

      const responseDataChart = {
        prices: existingChartData.prices.map((entry) => [
          entry.timestamp,
          entry.value,
        ]),
        market_caps: existingChartData.market_caps.map((entry) => [
          entry.timestamp,
          entry.value,
        ]),
        total_volumes: existingChartData.total_volumes.map((entry) => [
          entry.timestamp,
          entry.value,
        ]),
      };

      //res.status(200).json(storedChartData);
      res.status(200).json(responseDataChart);
      return;
    }

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

    const newChartEntry = new ChartData({
      coin: coin._id,
      days: days,
      timestamps: chartData.timestamps,
      prices: response.data.prices.map(mapChartData),
      market_caps: response.data.prices.map(mapChartData),
      total_volumes: response.data.prices.map(mapChartData),
    });

    await newChartEntry.save();

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching chart data:", error);

    if (error.response && error.response.status === 429) {
      //existantes depuis la base de données
      const coin = await Coin.findOne({ id: id });
      const storedChartData = await ChartData.findOne({
        coin: coin._id,
        days: days,
      });
      if (storedChartData) {
        // If stored data is found, customize the response format
        const responseDataChart = {
          prices: storedChartData.prices.map((entry) => [
            entry.timestamp,
            entry.value,
          ]),
          market_caps: storedChartData.market_caps.map((entry) => [
            entry.timestamp,
            entry.value,
          ]),
          total_volumes: storedChartData.total_volumes.map((entry) => [
            entry.timestamp,
            entry.value,
          ]),
        };

        res.status(200).json(responseDataChart);
        return;
      }
    }

    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
