const express = require('express');
const router = express.Router();
const conteudosWebsiteController = require('../controllers/conteudos_websiteController');

router.get('/:id', conteudosWebsiteController.getId);
router.post('/create/', conteudosWebsiteController.create);
router.delete('/delete/', conteudosWebsiteController.delete);
router.put('/updateseccao/:id', conteudosWebsiteController.updateSeccao);
router.put('/updateheader/:id', conteudosWebsiteController.updateHeader);
router.put('/updatefooter/:id', conteudosWebsiteController.updateFooter);

module.exports = router;
