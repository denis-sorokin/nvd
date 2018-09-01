const express = require('express');
const router = express.Router();

const NvdController = require('../app/controllers/NvdController');

/* GET home page. */
router.get('/', function(req, res) {
  res.send({msg: 'App in development.'});
});

/* GET nvd */
router.get('/nvd', NvdController.getData.bind(NvdController));

module.exports = router;
