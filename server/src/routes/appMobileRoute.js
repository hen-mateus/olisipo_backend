const express = require('express');
const router = express.Router();
const appMobileController = require('../controllers/appMobileController');
const { createTokens, validateToken } = require("../jwt");


app.get('/', validateToken, appMobileController.list);

module.exports = router;
