var express = require('express');
var router = express.Router();
const NvmController = require('../app/Controllers/NvmController');

/* GET nvm data. */
router.get('/', NvmController.getData);

module.exports = router;
