const express = require('express');
const router = express.Router();
const relacaoEstadosController = require('../controllers/relacaoEstadosController');

const { createTokens, validateToken } = require("../jwt");

router.post('/createhoras',validateToken, relacaoEstadosController.createHoras);
router.post('/createajudas', validateToken, relacaoEstadosController.createAjudas);
router.post('/createdespesas', validateToken, relacaoEstadosController.createDespesasViatura);
router.post('/createfaltas', validateToken, relacaoEstadosController.createFaltas);
router.post('/createferias', validateToken, relacaoEstadosController.createFerias);

module.exports = router;