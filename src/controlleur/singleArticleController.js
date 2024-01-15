const Article = require("../models/articles");

const SingleArticleCtrl = {
  fetchOneArticle: async (req, res) => {
    const article_id = req.params.article_id;

    try {
      // Perform actions to fetch a single article based on article_id
      const article = await Article.findOne({ article_id });

      // Send the article as JSON response
      res.json(article);
    } catch (error) {
      console.error("Error fetching single article:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = SingleArticleCtrl;
