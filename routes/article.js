var express = require("express");
var router = express.Router();
var auth = require("../middlewares/authorize");
var ArticleData = require("../controllers/articles");

// all are protected routes
router.get("/tags", ArticleData.filterByTags); // tag will be passed as a query string
router.post("/addarticle", auth.verifyToken, ArticleData.addArticles);
router.delete("/delete/:id", ArticleData.deleteArticle);
router.put("/update/:id", ArticleData.updateArticle);
router.get("/listarticles", ArticleData.listAllArticles);
router.get("/article/:id", ArticleData.filterById);

module.exports = router;
