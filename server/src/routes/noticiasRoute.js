const express = require('express');
const router = express.Router();
const noticiasController = require('../controllers/noticiasController');

router.get('/', noticiasController.list);
router.get('/:id', noticiasController.getId);
router.post('/create/', noticiasController.create);
router.put('/update/:id', noticiasController.update);
router.post('/delete/', noticiasController.delete);

module.exports = router;
