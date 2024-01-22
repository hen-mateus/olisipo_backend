const express = require('express');
const router = express.Router();
const pessoasController = require('../controllers/pessoasController');

const { createTokens, validateToken } = require("../jwt");

router.get('/', pessoasController.list);
router.get('/managers', pessoasController.listManagers);
router.get('/getId', validateToken, pessoasController.getId);
router.get('/:id', validateToken, pessoasController.getIdIndividual);
router.put('/update/', validateToken, pessoasController.update);
router.put('/updateindividual/:id', validateToken, pessoasController.updateindividual);
router.put('/updatepormail/', pessoasController.updatePorEmail);
router.post('/enviarmail/', pessoasController.enviarMail);
router.put('/updatedados/:id', validateToken, pessoasController.updateDados);
router.post('/login', pessoasController.login);
router.post('/register', pessoasController.register);
router.post('/logout', validateToken, (req, res) => {
    res.clearCookie("access-token");
    res.json({ success: true, message: 'Utilizador desconectado com sucesso' });
});

module.exports = router;
