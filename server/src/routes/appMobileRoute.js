const express = require('express');
const router = express.Router();
const appMobileController = require('../controllers/appMobileController');
const { createTokens, validateToken } = require("../jwt");


router.get('/', appMobileController.list);

module.exports = router;
