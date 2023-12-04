const express = require('express');
const router = express.Router();
const tipoPessoaController = require('../controllers/tipoPessoaController');

router.get('/', tipoPessoaController.list);


module.exports = router;
