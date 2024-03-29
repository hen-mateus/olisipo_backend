const express = require('express');
const router = express.Router();
const conteudosWebsiteController = require('../controllers/conteudos_websiteController');

const { createTokens, validateToken } = require("../jwt");

router.get('/', conteudosWebsiteController.list);
router.get('/header/', conteudosWebsiteController.listHeader);
router.get('/footer/', conteudosWebsiteController.listFooter);
router.get('/:id', conteudosWebsiteController.getId);
router.post('/create/', validateToken, conteudosWebsiteController.create);
router.post('/delete/', validateToken, conteudosWebsiteController.delete);
router.put('/updateseccao/:id', validateToken, conteudosWebsiteController.updateSeccao);
router.put('/updateheader/:id', validateToken, conteudosWebsiteController.updateHeader);
router.put('/updatefooter/:id', validateToken, conteudosWebsiteController.updateFooter);

module.exports = router;
