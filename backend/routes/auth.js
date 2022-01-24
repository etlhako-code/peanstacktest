
var express = require('express');
var router = express.Router();
var userControllers=require('../controllers/userControllers');

router.post('/register',userControllers.createUser);

router.post('/login',userControllers.login);

module.exports=router;