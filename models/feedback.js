const express = require(express);
const mongoose = require(mongoose);
const Schema = mongoose.Schema;

var feedbackSchema = new Schema(
  {
    likes: { type: Number },
    comments: {
      count: { type: Number },
      comment: [{ type: String }],
      likes: { type: Number },
    },
  },
  { timeStamps: true }
);

var Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
