const express = require('express');
const router = express.Router();
const reuniaoRHController = require('../controllers/reuniao_rhController');

const { createTokens, validateToken } = require("../jwt");

router.get('/', reuniaoRHController.list);
router.get('/:id', reuniaoRHController.getId);
router.post('/create/', validateToken, reuniaoRHController.create);

module.exports = router;
