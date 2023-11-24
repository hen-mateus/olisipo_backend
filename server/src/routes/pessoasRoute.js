const express = require('express');
const router = express.Router();
const pessoasController = require('../controllers/pessoasController');

const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("../jwt");

router.get('/', pessoasController.list);
router.get('/:id', pessoasController.getId);
//router.post('/create/', pessoasController.create);
router.put('/update/:id', pessoasController.update);
router.post('/login', pessoasController.login);
router.post('/register', pessoasController.register);

module.exports = router;
