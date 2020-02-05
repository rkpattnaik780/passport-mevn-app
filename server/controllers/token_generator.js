var jwt = require("jsonwebtoken");
var tokenList = {};

var createToken = function(auth) {
  return jwt.sign(
    {
      id: auth.id
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: 60 * 120
    }
  );
};

var createRefreshToken = function(auth) {
  return jwt.sign(
    {
      id: auth.id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: 60 * 1200
    }
  );
};

var generateToken = function(req, res, next) {
  let token = createToken(req.user);
  let refreshToken = createRefreshToken(req.user);
  req.session.token = token;
  req.session.refreshToken = refreshToken;
  tokenList[refreshToken] = {
    token: token,
    userId: req.user.id
  };
  req.session.isLoggedIn = true;
  res.redirect("http://localhost:8080/");
};

var sendToken = function(req, res) {
  res.setHeader("x-auth-token", req.token);
  return res.status(200).send(JSON.stringify(req.user));
};

var generateFromRefreshToken = function(refreshToken) {
  const accessToken = jwt.sign(
    {
      id: tokenList[refreshToken].userId
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: 60 * 120
    }
  );
  tokenList[refreshToken] = {
    token: accessToken
  };
  req.session.token = accessToken;
};

module.exports = {
  generateToken: generateToken,
  sendToken: sendToken,
  generateFromRefreshToken: generateFromRefreshToken,
  tokenList: tokenList
};
