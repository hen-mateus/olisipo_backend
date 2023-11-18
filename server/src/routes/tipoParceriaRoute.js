const express = require('express');
const router = express.Router();
const tipoParceriaController = require('../controllers/tipo_parceriaController');

router.get('/', tipoParceriaController.list);
router.post('/create/', tipoParceriaController.create);
router.put('/update/:id', tipoParceriaController.update);

module.exports = router;
