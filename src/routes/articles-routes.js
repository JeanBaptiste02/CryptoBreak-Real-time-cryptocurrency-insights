const express = require("express");
const router = express.Router();

const ArticlesCtrl = require("../controlleur/articlesController");

router.get("/articles", ArticlesCtrl.fetchArticles);

module.exports = router;
