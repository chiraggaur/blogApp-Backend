var jwt = require("jsonwebtoken");

module.exports = {
  // for protected routes
  verifyToken: (req, res, next) => {
    var token = req.headers.authorization;
    // console.log("token coming from frontend" + "  " + token);
    try {
      if (token) {
        var payload = jwt.verify(token, process.env.SECRET);
        req.user = payload;
        return next();
      } else {
        res.status(400).json({ error: "Token Required" });
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      return res.status(401).json({ error: "Invalid Token" });
    }
  },
};
