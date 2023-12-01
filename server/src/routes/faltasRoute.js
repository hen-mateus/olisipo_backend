const express = require('express');
const router = express.Router();
const faltasController = require('../controllers/faltasController');
const { createTokens, validateToken } = require("../jwt");

router.get('/', faltasController.list);
router.get('/:id', faltasController.getId);
router.post('/create/',validateToken, faltasController.create);

module.exports = router;
