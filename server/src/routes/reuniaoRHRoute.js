const express = require('express');
const router = express.Router();
const reuniaoRHController = require('../controllers/reuniao_rhController');

router.get('/', reuniaoRHController.list);
router.get('/:id', reuniaoRHController.getId);
router.post('/create/', reuniaoRHController.create);

module.exports = router;
