const express = require('express');
const router = express.Router();
const horasController = require('../controllers/relatorio_horasController');

const { createTokens, validateToken } = require("../jwt");

router.get('/', horasController.list);
router.get('/:id', horasController.getId);
router.post('/create/', validateToken, horasController.create);

module.exports = router;
