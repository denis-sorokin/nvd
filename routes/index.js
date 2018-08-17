var express = require('express');
var router = express.Router();

var nvmRouter = require('./routes/nvm');

/* GET home page. */
router.get('/', function(req, res) {
  res.send({msg: 'App in development.'});
});
router.get('/nvm', nvmRouter.getData);

module.exports = router;
