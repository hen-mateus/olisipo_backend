const express = require('express');
const router = express.Router();
const feriasController = require('../controllers/feriasController');
const { createTokens, validateToken } = require("../jwt");

router.get('/', feriasController.list);
router.get('/:id', feriasController.getId);
router.post('/create/',validateToken, feriasController.create);

module.exports = router;
