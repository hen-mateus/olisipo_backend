const express = require('express');
const router = express.Router();
const notificacoesController = require('../controllers/notificacoesController');

router.get('/', notificacoesController.list);

module.exports = router;
