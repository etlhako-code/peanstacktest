var {Sequelize}=require('sequelize');
const Product = require('../models/Product.model');
var User = require('../models/user.model');
var utils = require('../utils/index');
const { Op } = require("sequelize");

var getAllProducts=async(req,res)=>{
  await Product.findAll()
  .then((data)=>{
      if(!data) res.status(204).json({message:"data not found "});
      res.status(200).json({data:data});
  })
  .catch((err)=>{
      res.send(err.status).json({err:err.message});
  });
}

var getProduct=async(req,res)=>{
    const myProduct ={
        prodname: req.body.prodname
    };
    await Product.findOne({
        where: {prodname: myProduct.prodname},
        attributes: ['id', ['prodname','product name']]
      }).then(function(prod) {
        if(prod){
            res.status(200).json({product:prod});
        }else{
            res.status(404).json({product:prod,message:"not found"});
        }
      }).catch((err)=>{
        res.status(400).send('Bad Request');
      });
}

var deleteProduct=async(req,res)=>{}


var updateProduct=async(req,res)=>{
    const myProduct ={
        prodname: req.body.prodname
    };
    
    await Product.findOne({
        where: {prodname: myProduct.prodname},
        attributes: ['id', ['prodname','product name']]
      }).then(async(prod)=> {
        if(prod){
            await Product.update(myProduct, {
                where: {
                    id: myProduct.id
                }
            });
            res.status(409).json({product:prod,message:"product already exists"});
        }else{
            res.status(404).json({message:"doesnt exists"});
        }
      }).catch((err)=>{
        res.status(400).send('Bad Request');
      });
}

var createProduct=async(req,res)=>{

    const myProduct={
        prodname: req.body.prodname,
        shortdesc:req.body.shortdesc,
        longdesc:req.body.longdesc,
        price:req.body.price,
        category:req.body.category
    };
    
    const valid = utils.validateProduct(myProduct);
    if(!valid) return res.status(400).send(error);

    await Product.findOne({
        where: {prodname: myProduct.prodname},
        attributes: ['id', ['prodname','prod name']]
      }).then(function(prod) {
        if(prod){
            res.status(409).json({product:prod,message:"product already exists"});
        }else{
            Product.create(myProduct).then((data)=>{
                console.log('user created');
                res.status(201).json({product:data,message:"product created successfully"});
            }).catch((err)=>{
                res.status(400).send('Bad Request');
            });
        }
      }).catch((err)=>{
        res.status(400).send('Bad Request');
      });
   
} 

var purgeProducts=async ()=>{
    await Product.destroy({
        truncate: true
    }).then(async()=>{
    });
    
}

module.exports={
    getAllProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    createProduct,
    purgeProducts
}

