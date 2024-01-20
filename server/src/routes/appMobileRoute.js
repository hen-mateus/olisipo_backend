const express = require('express');
const router = express.Router();
const appMobileController = require('../controllers/appMobileController');
const { createTokens, validateToken } = require("../jwt");


router.get('/', validateToken, appMobileController.list);
router.get('/noticias', appMobileController.listNoticias);

module.exports = router;
