const express = require('express');
const router = express.Router();
const parceriasController = require('../controllers/parceriasController');

const { createTokens, validateToken } = require("../jwt");

router.get('/', parceriasController.list);
router.get('/:id', parceriasController.getId);
router.post('/create/', validateToken, parceriasController.create);
router.put('/update/:id', validateToken, parceriasController.update);
router.post('/delete/', validateToken, parceriasController.delete);

module.exports = router;
