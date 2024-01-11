var express = require("express");
var Article = require("../models/post");
var SignUp = require("../models/signUp");
var path = require("path");
var ArticleData = {
  listAllArticles: async (req, res, next) => {
    let { sort } = req.query;
    try {
      if (sort === "newest") {
        const data = await Article.find({})
          .sort({ updatedAt: -1 })
          .populate("author");
        // console.log(data); // check this for image validation
        res.json(data);
      } else if (sort === "oldest") {
        const data = await Article.find({})
          .sort({ updatedAt: 1 })
          .populate("author");
        res.json(data);
      } else {
        const data = await Article.find({}).populate("author");
        res.json(data);
      }
      // console.log(data);
    } catch (err) {
      res.send(err);
    }
  },
  filterByTags: async (req, res, next) => {
    try {
      // Access the 'tag' query parameter from the URL
      const tag = req.query.tag;

      // Retrieve all articles from the database
      const articles = await Article.find({});

      // Use the filter method to find articles that include the specified tag
      const showArticles = articles.filter((article) =>
        article.tagList.includes(tag)
      );

      if (showArticles.length > 0) {
        res.send(showArticles);
      } else {
        res.send("No articles found with the specified tag");
      }
    } catch (err) {
      res.send(err);
    }
  },
  filterByAuthors: async (req, res, next) => {
    try {
      // Access the 'tag' query parameter from the URL
      const author = req.query.author;

      // Retrieve all articles from the database
      const articles = await Article.find({});

      // Use the filter method to find articles that include the specified tag
      const showArticles = articles.filter(
        (article) => article.author === author
      );

      if (showArticles.length > 0) {
        res.send(showArticles);
      } else {
        res.send("No articles found with the specified author");
      }
    } catch (err) {
      res.send(err);
    }
  },
  filterByFavorited: async (req, res, next) => {
    try {
      // Access the 'tag' query parameter from the URL
      const favourite = req.query.favourite;

      // Retrieve all articles from the database
      const articles = await Article.find({});

      // Use the filter method to find articles that include the specified tag
      const showArticles = articles.filter(
        (favourite) => article.favourite === favourite
      );

      if (showArticles.length > 0) {
        res.send(showArticles);
      } else {
        res.send("No articles found with the specified author");
      }
    } catch (err) {
      res.send(err);
    }
  },
  addArticles: async (req, res, next) => {
    let email = req.user.email;
    try {
      let user = await SignUp.findOne({ email: email });
      req.body.author = user.id;
      await Article.create(req.body);
      res.status(200).json({ message: "article created successfully" });
    } catch (error) {
      // console.error("Error:", error);
      res.status(401).json({
        message: "input fields cannot be empty",
        error: error.message,
      });
    }
  },
  deleteArticle: async (req, res, next) => {
    try {
      let id = req.params.id;
      await Article.findByIdAndDelete(id);
      res.send("article deleted successfully");
    } catch (err) {
      res.send(err);
    }
  },
  updateArticle: async (req, res, next) => {
    try {
      let id = req.params.id;
      let data = await Article.findByIdAndUpdate(id, req.body);
      res.json(data);
    } catch (err) {
      res.send(err);
    }
  },
  filterById: async (req, res, next) => {
    try {
      let id = req.params.id;
      let data = await Article.findById(id).populate("author");
      res.json(data);
    } catch (err) {
      res.send(err);
    }
  },
  // comments CRUD pending use populate to fecth comment details from object ID before use
};

module.exports = ArticleData;
