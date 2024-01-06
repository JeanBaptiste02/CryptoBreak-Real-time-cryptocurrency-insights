const axios = require("axios");
const Article = require("../models/articles");

let lastArticleUpdateTimestamp = 0;

exports.fetchArticles = async (req, res) => {
  try {
    const currentTime = new Date().getTime();
    const twoHoursInMillis = 2 * 60 * 60 * 1000;

    if (currentTime - lastArticleUpdateTimestamp < twoHoursInMillis) {
      const storedData = await Article.find();
      res.status(200).json(storedData);
      return;
    }

    const response = await axios.get(
      "https://newsdata.io/api/1/news?apikey=pub_350602bb764b88ab03dabf30d0c3cd26d95bd&q=crypto&country=cn,fr,in,ru,us&language=fr"
    );

    await Article.deleteMany();

    const selectedData = response.data.results.map((article) => ({
      article_id: article.article_id,
      title: article.title,
      link: article.link,
      keywords: article.keywords,
      creator: article.creator,
      video_url: article.video_url,
      description: article.description,
      content: article.content,
      pubDate: new Date(article.pubDate),
      image_url: article.image_url,
      source_id: article.source_id,
      source_priority: article.source_priority,
      country: article.country,
      category: article.category,
      language: article.language,
      ai_tag: article.ai_tag,
      sentiment: article.sentiment,
      sentiment_stats: article.sentiment_stats,
    }));

    await Article.insertMany(selectedData);

    lastArticleUpdateTimestamp = currentTime;

    res.status(200).json(selectedData);
  } catch (error) {
    console.error("Error fetching and storing articles:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
