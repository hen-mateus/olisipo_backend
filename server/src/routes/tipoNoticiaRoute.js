const express = require('express');
const router = express.Router();
const tipoNoticiaController = require('../controllers/tipo_noticiaController');

const { createTokens, validateToken } = require("../jwt");

router.get('/', tipoNoticiaController.list);
router.post('/create/', validateToken, tipoNoticiaController.create);
router.put('/update/:id', validateToken, tipoNoticiaController.update);

module.exports = router;
