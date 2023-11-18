const express = require('express');
const router = express.Router();
const ajudasCustoController = require('../controllers/ajudascustoController');

router.get('/', ajudasCustoController.list);
router.get('/:id', ajudasCustoController.getId);
router.post('/create/', ajudasCustoController.create);

module.exports = router;
