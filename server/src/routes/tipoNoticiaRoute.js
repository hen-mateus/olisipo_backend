const express = require('express');
const router = express.Router();
const tipoNoticiaControllerController = require('../controllers/tipo_noticiaController');

router.get('/', tipoNoticiaControllerController.list);
router.post('/create/', tipoNoticiaControllerController.create);
router.put('/update/:id', tipoNoticiaControllerController.update);

module.exports = router;
