const express = require('express');
const router = express.Router();
const pessoasAuxiliarController = require('../controllers/pessoas_auxiliarController');

const { createTokens, validateToken } = require("../jwt");

router.get('/:id', pessoasAuxiliarController.getId);
router.post('/create/', validateToken, pessoasAuxiliarController.create);

module.exports = router;
