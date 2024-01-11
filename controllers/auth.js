var express = require("express");
var SignUp = require("../models/signUp");
// var SignIn = require("../models/signIn");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

// crud on articles
var userData = {
  listAllUsers: async (req, res, next) => {
    try {
      data = await SignUp.find({});
      res.json(data);
    } catch (err) {
      res.send(err);
    }
  },
  signUpNewUser: async (req, res, next) => {
    try {
      // Access form fields and uploaded file through req.body and req.file
      const { username, email, password } = req.body;
      console.log(req.file);

      // // Get the uploaded file path (if available)
      const imageUrl = `${req.protocol}://${req.get("host")}/Images/${
        req.file.filename
      }`;
      // // // // Create a new user with the form data and file path
      await SignUp.create({ username, email, password, imageUrl });

      return res.status(200).json({ message: "User registered Successfully" });
    } catch (err) {
      return res.status(401).json({ message: err.message });
    }
  },
  // signUpNewUser: async (req, res, next) => {
  //   try {
  //     data = req.body;
  //     console.log(data);
  //     await SignUp.create(data);
  //     return res.status(200).json({ message: "User registered Successfully" });
  //   } catch (err) {
  //     return res.status(401).json({ message: err.message });
  //   }
  // },
  // sign in user match email/password with registered database
  signInUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        // req.flash("warning", "Email/Password Field is missing");
        // res.Error("Email/Password Field is missing");
        return res
          .status(401)
          .json({ message: "Email/Password Field is missing" });
      }

      const user = await SignUp.findOne({ email: email });

      if (!user) {
        return res.status(401).json({ message: "User not registered" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        var Token = await user.signToken();
        // console.log(user.userJSON(Token));
        return res.status(200).json({
          message: "logged in successfully",
          user: user.userJSON(Token),
        });
      } else {
        return res.status(401).json({ message: "User password incorrect" });
      }
    } catch (err) {
      return res
        .status(404)
        .json({ message: "Error in user authentication: " + err.message });
    }
  },

  currentUser: async (req, res, next) => {
    var token = req.headers.authorization;
    // var email = req.user.email;
    // console.log(email);
    try {
      if (token) {
        let user = await SignUp.findOne({ email: req.user.email });
        res.json(user); // current user details send after verify;
      } else {
        res.status(401).json({ error: "Token Required" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  updateUser: async (req, res, next) => {
    var token = req.headers.authorization;
    try {
      if (token) {
        let payload = await jwt.verify(token, process.env.SECRET);
        req.user = payload;
        let user = await SignUp.findOne({ email: req.user.email });
        res.json(user.userJSON(token));
      } else {
        res.status(400).json({ error: "Token Required" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  findUser: async (req, res, next) => {
    var token = req.headers.authorization; // optional
    let username = req.params.username;
    try {
      if (token) {
        let user = await SignUp.findOne({ username: username });
        res.json(user);
      } else {
        res.status(400).json({ error: "Token Required" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  logout: (req, res, next) => {
    // You can add the token to a blacklist here if you want to invalidate it
    // This is optional and depends on your specific requirements
    // blacklistedTokens.push(req.headers.authorization);

    res.json({ message: "Logout successful" });
  },
};

module.exports = userData;
