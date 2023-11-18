const express = require('express');
const router = express.Router();
const pessoasAuxiliarController = require('../controllers/pessoas_auxiliarController');

router.get('/:id', pessoasAuxiliarController.getId);
router.post('/create/', pessoasAuxiliarController.create);

module.exports = router;
