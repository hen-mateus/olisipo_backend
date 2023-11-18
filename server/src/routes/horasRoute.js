const express = require('express');
const router = express.Router();
const horasController = require('../controllers/relatorio_horasController');

router.get('/', horasController.list);
router.get('/:id', horasController.getId);
router.post('/create/', horasController.create);

module.exports = router;
