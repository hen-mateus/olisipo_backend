const express = require('express');
const router = express.Router();
const parceriasController = require('../controllers/parceriasController');

router.get('/', parceriasController.list);
router.get('/:id', parceriasController.getId);
router.post('/create/', parceriasController.create);
router.put('/update/:id', parceriasController.update);
router.post('/delete/', parceriasController.delete);

module.exports = router;
