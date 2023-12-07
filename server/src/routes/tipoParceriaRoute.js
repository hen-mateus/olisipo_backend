const express = require('express');
const router = express.Router();
const tipoParceriaController = require('../controllers/tipo_parceriaController');

const { createTokens, validateToken } = require("../jwt");

router.get('/', tipoParceriaController.list);
router.post('/create/', validateToken, tipoParceriaController.create);
router.put('/update/:id', validateToken, tipoParceriaController.update);

module.exports = router;
