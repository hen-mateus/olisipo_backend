const express = require('express');
const router = express.Router();
const parceriasController = require('../controllers/parceriasController');

router.get('/', parceriasController.list);
router.post('/create/', parceriasController.create);
router.put('/update/:id', parceriasController.update);
router.delete('/delete/', parceriasController.delete);

module.exports = router;
