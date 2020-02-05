//token handling middleware
let jwt = require("jsonwebtoken");
const { generateFromRefreshToken, tokenList } = require("./token_generator");

let checkToken = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.json({
      success: false,
      message: "Kindly log in!"
    });
  }

  let token = req.headers["x-auth-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
  let refreshToken =
    req.headers["refresh-token"] || req.headers["refresh-token"];

  if (token && token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (refreshToken && refreshToken.startsWith("Bearer ")) {
    refreshToken = refreshToken.slice(7, refreshToken.length);
  }

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        if (refreshToken && refreshToken in tokenList) {
          generateFromRefreshToken(refreshToken);
          next();
        } else {
          res.json({
            msg: "Kindly login again"
          });
        }
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: "Auth token is not supplied"
    });
  }
};

module.exports = {
  checkToken: checkToken
};
