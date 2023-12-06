const express = require('express');
const router = express.Router();
const recibosVencimentoController = require('../controllers/recibos_vencimentoController');

const { createTokens, validateToken } = require("../jwt");

router.get('/', recibosVencimentoController.list);
router.get('/:id', recibosVencimentoController.getId);
router.post('/create/', validateToken, recibosVencimentoController.create);
router.put('/update/:id', recibosVencimentoController.update);

module.exports = router;
