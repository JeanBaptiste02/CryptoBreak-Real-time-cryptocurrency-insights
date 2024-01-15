const express = require("express");
const router = express.Router();

const ArticlesCtrl = require("../controlleur/articlesController");
const SingleArticleCtrl = require("../controlleur/singleArticleController");

router.get("/articles", ArticlesCtrl.fetchArticles);

router.get("/articles/:article_id", SingleArticleCtrl.fetchOneArticle);

module.exports = router;
