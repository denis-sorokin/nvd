const express = require('express');
const router = express.Router();

const NvdController = require('../app/controllers/NvdController');

/* GET home page. */
router.get('/', function(req, res) {
  res.send({msg: 'App in development.'});
});

/* GET nvd */
router.get('/nvd', NvdController.getList.bind(NvdController));

/* GET data by year */
router.get('/nvd/:year', NvdController.getDataByYear.bind(NvdController));

module.exports = router;
