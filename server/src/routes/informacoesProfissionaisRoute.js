const express = require('express');
const router = express.Router();
const informacoesProfissionaisController = require('../controllers/informacoes_profissionaisController');

const { createTokens, validateToken } = require("../jwt");

router.get('/',validateToken, informacoesProfissionaisController.getId);
router.post('/create/', validateToken, informacoesProfissionaisController.create);
router.delete('/delete/', validateToken, informacoesProfissionaisController.delete);

module.exports = router;
