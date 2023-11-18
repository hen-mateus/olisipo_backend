const express = require('express');
const router = express.Router();
const despesasViaturaController = require('../controllers/despesas_viatura_propriaController');

router.get('/', despesasViaturaController.list);
router.get('/:id', despesasViaturaController.getId);
router.post('/create/', despesasViaturaController.create);

module.exports = router;
