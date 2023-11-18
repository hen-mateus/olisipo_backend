const express = require('express');
const router = express.Router();
const estadosController = require('../controllers/estadosController');

router.get('/estadopagamento', estadosController.listComPagamento);
router.get('/estadosempagamento', estadosController.listSemPagamento);

module.exports = router;
