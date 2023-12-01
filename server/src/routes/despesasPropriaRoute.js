const express = require('express');
const router = express.Router();
const despesasViaturaController = require('../controllers/despesas_viatura_propriaController');
const { createTokens, validateToken } = require("../jwt");

router.get('/', despesasViaturaController.list);
router.get('/:id', despesasViaturaController.getId);
router.post('/create/',validateToken, despesasViaturaController.create);

module.exports = router;
