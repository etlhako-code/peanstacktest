var express = require('express');
var router = express.Router();
var productControllers=require('../controllers/productControllers');
var validateToken = require('../utils/index');


router.get('/all',productControllers.getAllProducts);
router.get('/:id',productControllers.getProduct);
router.put('/edit/:id',productControllers.updateProduct);
router.delete('/del/:id',productControllers.deleteProduct);
router.delete('/del',productControllers.purgeProducts);

module.exports=router;