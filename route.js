const router = require('express').Router();
const tokenController = require('./tokenController.js');
 
router.get('/tokens', tokenController.getTokens);
router.use('/new-token', tokenController.postToken);
router.use('/delete-token/:id', tokenController.deleteToken);
router.use('/update-token', tokenController.updateToken);

module.exports = router;
 
 
