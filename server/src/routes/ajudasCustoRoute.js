const express = require('express');
const router = express.Router();
const ajudasCustoController = require('../controllers/ajudascustoController');

const { createTokens, validateToken } = require("../jwt");

router.get('/', ajudasCustoController.list);
router.get('/:id', ajudasCustoController.getId);
router.post('/create/', validateToken, ajudasCustoController.create);

module.exports = router;
