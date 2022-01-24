var express = require('express');
var router = express.Router();
var userControllers=require('../controllers/userControllers');

router.get('/all',userControllers.getAllUsers);
router.get('/:id',userControllers.getUser);
router.put('/edit/:id',userControllers.updateUser);
router.delete('/del/:id',userControllers.deleteUser);
router.delete('/del',userControllers.purgeUsers);

module.exports=router;