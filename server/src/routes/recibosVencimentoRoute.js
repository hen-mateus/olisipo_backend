const express = require('express');
const router = express.Router();
const recibosVencimentoController = require('../controllers/recibos_vencimentoController');

const { createTokens, validateToken } = require("../jwt");

router.get('/', recibosVencimentoController.list);
router.get('/getId', validateToken, recibosVencimentoController.getId);
router.post('/create/', validateToken, recibosVencimentoController.create);
router.put('/update/', validateToken, recibosVencimentoController.update);

module.exports = router;
