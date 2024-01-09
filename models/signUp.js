const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

var registrationSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    imageUrl: { type: String, required: true },
    password: { type: String, required: true },
    followers: {
      count: { type: Number },
      names: [{ type: String }],
    },
    follows: [{ type: mongoose.Schema.Types.ObjectId }],
  },
  { timestamps: { createdAt: "created_at" } }
);

// hash password beforo saving to DB;
registrationSchema.pre("save", async function (next) {
  try {
    if (this.password && this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10); // new hashed password updated
      // console.log(this.password);
    }
    next();
  } catch (err) {
    next(err);
  }
});

// token generation
registrationSchema.methods.signToken = async function () {
  var payload = { email: this.email, password: this.password };
  try {
    var Token = await jwt.sign(payload, process.env.SECRET);
    // console.log(payload);
    return Token;
  } catch (err) {
    return err;
  }
};

// sending json format back to client after successful login along with token'

registrationSchema.methods.userJSON = function (token) {
  return {
    userId: this._id,
    username: this.username,
    email: this.email,
    token: token,
  };
};

var Register = mongoose.model("Register", registrationSchema);

module.exports = Register;

// import models in routes/controllers for CRUD operations;
