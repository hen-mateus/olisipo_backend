const express = require('express');
const router = express.Router();
const pessoasController = require('../controllers/pessoasController');

router.get('/', pessoasController.list);
router.get('/:id', pessoasController.getId);
router.post('/create/', pessoasController.create);
router.put('/update/:id', pessoasController.update);

module.exports = router;
