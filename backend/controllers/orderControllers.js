var {Sequelize}=require('sequelize');
const Order = require('../models/order.model');
//var User = require('../models/user.model');
var utils = require('../utils/index');
const { Op } = require("sequelize");
const Orderitem = require('../models/order-item.model');

var getMyOrders=async(req,res)=>{
  await Order.findAll({where:{id:req.body.id}})
  .then((data)=>{
      if(!data) res.status(204).json({message:"data not found "});
      res.status(200).json({data:data});
  })
  .catch((err)=>{
      res.send(err.status).json({err:err.message});
  });
}

var getOrder=async(req,res)=>{
    const myOrder ={
        orderid: req.params.orderid
    };
    Order.sequelize.query()
    await Order.findOne({
        where: {orderid: myOrder.orderid},
        attributes: ['id', ['prodname','product name']]
      }).then(function(prod) {
        if(prod){
            res.status(200).json({Order:prod});
        }else{
            res.status(404).json({Order:prod,message:"not found"});
        }
      }).catch((err)=>{
        res.status(400).send('Bad Request');
      });
}

var deleteOrder=async(req,res)=>{}


/* var updateOrder=async(req,res)=>{
    const myOrder ={
        prodname: req.body.prodname
    };
    
    await Order.findOne({
        where: {prodname: myProduct.prodname},
        attributes: ['id', ['prodname','product name']]
      }).then(async(prod)=> {
        if(prod){
            await Order.update(myProduct, {
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
} */

var createOrder=async(req,res)=>{


    const products= req.body.products;
    const item={
        prodid:products[0].prodid,
        qty:products[0].qty
    }
    const myOrder={
        
        totalprice:req.body.totalprice,
        addressid:req.body.addressid,
        deliverydate:req.body.deliverydate,
        orderstatus: "pending"
    }
    Order.create(myOrder).then((odr)=>{
        if(!odr) return res.status(400).send({msg:"something went wrong"});
        item.orderid=odr.orderid;
        Orderitem.create(item).then((itm)=>{
            if(!itm) return res.status(409).send({msg:"order create failed"});
            res.status(200).send(itm);
        }).catch((err)=>{
            res.status(409).send({msg:err.message})
        })
    }).catch((err)=>{
        res.status(400).send({msg:err.message});
    });
   
} 

var purgeOrders=async ()=>{
    await Product.destroy({
        truncate: true
    }).then(async()=>{
    });
    
}

module.exports={
    getMyOrders,
    getOrder,
    deleteOrder,
    createOrder,
    purgeOrders
}

