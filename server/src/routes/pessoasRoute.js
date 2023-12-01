const express = require('express');
const router = express.Router();
const pessoasController = require('../controllers/pessoasController');

const { createTokens, validateToken } = require("../jwt");

router.get('/', pessoasController.list);
router.get('/getId', validateToken, pessoasController.getId);
//router.post('/create/', pessoasController.create);
router.put('/update/', validateToken, pessoasController.update);
router.post('/login', pessoasController.login);
router.post('/register', pessoasController.register);
router.post('/logout', validateToken, (req, res) => {
    res.clearCookie("access-token");
    res.json({ success: true, message: 'Usuário desconectado com sucesso' });
});

module.exports = router;
