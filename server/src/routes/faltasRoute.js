const express = require('express');
const router = express.Router();
const faltasController = require('../controllers/faltasController');

router.get('/', faltasController.list);
router.get('/:id', faltasController.getId);
router.post('/create/', faltasController.create);

module.exports = router;
