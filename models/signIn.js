var express = require("express");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var loginSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: { createdAt: "created_at" } }
);

// };

var Login = mongoose.model("Login", loginSchema);

module.exports = Login;
