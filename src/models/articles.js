const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  article_id: String,
  title: String,
  link: String,
  keywords: [String],
  creator: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },
  video_url: String,
  description: String,
  content: String,
  pubDate: Date,
  image_url: String,
  source_id: String,
  source_priority: Number,
  country: [String],
  category: [String],
  language: String,
  ai_tag: String,
  sentiment: String,
  sentiment_stats: String,
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
