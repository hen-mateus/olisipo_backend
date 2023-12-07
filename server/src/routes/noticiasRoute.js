const express = require('express');
const router = express.Router();
const noticiasController = require('../controllers/noticiasController');

const { createTokens, validateToken } = require("../jwt");


router.get('/', noticiasController.list);
router.get('/:id', noticiasController.getId);
router.post('/create/', validateToken, noticiasController.create);
router.put('/update/:id', validateToken, noticiasController.update);
router.post('/delete/', validateToken, noticiasController.delete);

module.exports = router;
