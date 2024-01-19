const express = require('express');
const router = express.Router();
const notificacoesController = require('../controllers/notificacoesController');

const { createTokens, validateToken } = require("../jwt");

router.get('/', notificacoesController.list);
router.get('/manager', validateToken, notificacoesController.listManager);
router.put('/marcarTodasComoLidas', notificacoesController.marcarTodasComoLidas);

module.exports = router;
