const express = require('express');
const router = express.Router();
const noticiasController = require('../controllers/noticiasController');

router.get('/', noticiasController.list);
router.post('/create/', noticiasController.create);
router.put('/update/:id', noticiasController.update);
router.delete('/delete/', noticiasController.delete);

module.exports = router;
