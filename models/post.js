const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var articleSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    body: { type: String, required: true },
    taglist: [{ type: String, required: true }],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Register",
      required: true,
    }, // use with populate method for author details
    feedback: { type: mongoose.Schema.Types.ObjectId }, // use with populate method for followers details
  },
  { timeStamps: true }
);

var Article = mongoose.model("Article", articleSchema);

module.exports = Article;
