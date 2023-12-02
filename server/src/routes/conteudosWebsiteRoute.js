const express = require('express');
const router = express.Router();
const conteudosWebsiteController = require('../controllers/conteudos_websiteController');

const { createTokens, validateToken } = require("../jwt");

router.get('/', conteudosWebsiteController.list);
router.get('/:id', conteudosWebsiteController.getId);
router.post('/create/', validateToken, conteudosWebsiteController.create);
router.delete('/delete/', conteudosWebsiteController.delete);
router.put('/updateseccao/:id', conteudosWebsiteController.updateSeccao);
router.put('/updateheader/:id', conteudosWebsiteController.updateHeader);
router.put('/updatefooter/:id', conteudosWebsiteController.updateFooter);

module.exports = router;
