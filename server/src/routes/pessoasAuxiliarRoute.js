const express = require('express');
const router = express.Router();
const pessoasAuxiliarController = require('../controllers/pessoas_auxiliarController');

const { createTokens, validateToken } = require("../jwt");

router.get('/', pessoasAuxiliarController.list);
router.get('/:id', pessoasAuxiliarController.getId);
router.post('/create/', validateToken, pessoasAuxiliarController.create);
router.put('/update/:id', validateToken, pessoasAuxiliarController.update);

module.exports = router;
