var express = require('express');
var router = express.Router();
let { checkToken } = require("../controllers/token_validator");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/hello", checkToken, (req, res) => {
  res.json({
    "message" : "Hey! You can see this message as you are authorised to!"
  })
});

module.exports = router;
