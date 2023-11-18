const express = require('express');
const router = express.Router();
const feriasController = require('../controllers/ajudascustoController');

router.get('/', feriasController.list);
router.get('/:id', feriasController.getId);
router.post('/create/', feriasController.create);

module.exports = router;
