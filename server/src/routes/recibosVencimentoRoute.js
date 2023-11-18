const express = require('express');
const router = express.Router();
const recibosVencimentoController = require('../controllers/recibos_vencimentoController');

router.get('/', recibosVencimentoController.list);
router.get('/:id', recibosVencimentoController.getId);
router.post('/create/', recibosVencimentoController.create);
router.put('/update/:id', recibosVencimentoController.update);

module.exports = router;
