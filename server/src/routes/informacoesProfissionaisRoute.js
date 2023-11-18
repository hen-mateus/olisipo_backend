const express = require('express');
const router = express.Router();
const informacoesProfissionaisController = require('../controllers/informacoes_profissionaisController');

router.get('/:id', informacoesProfissionaisController.getId);
router.post('/create/', informacoesProfissionaisController.create);
router.delete('/delete/', informacoesProfissionaisController.delete);

module.exports = router;
