var {Sequelize}=require('sequelize');
const Post = require('../models/Product.model');
var User = require('../models/user.model');
var utils = require('../utils/index');

var getAllUsers=async(req,res)=>{
  await User.findAll()
  .then((data)=>{
      if(!data) res.status(204).json({message:"data not found "});
      res.status(200).json({data:data});
  })
  .catch((err)=>{
      res.send(err.status).json({err:err.message});
  });
}

var login=async(req,res)=>{
    //validate data from request body 
    var usr={
        email:req.body,
        password:req.body.password
    }
    const valid = utils.validateUserLogin(usr);
    if(!valid) return res.status(400).send(error);
    const user= await User.findOne({email:usr.email}).then(async (user)=> {
        if(!user) return res.status(400).send({msg:"email not found"});
        const validpass= bcrypt.compare(usr.password,user.password);

        if(!validpass) return res.status(400).send({msg:"oops"});

        const token=createToken({id:user.id,email:user.email});
        res.header("auth-token",token).send(token);

    });
}

var getUser=async(req,res)=>{
    const myuser ={
        username: req.body.username
    };
    await User.findOne({
        where: {username: myuser.username},
        attributes: ['id', ['username','user name']]
      }).then(function(usr) {
        if(usr){
            res.status(200).json({user:usr});
        }else{
            res.status(404).json({user:usr,message:"not found"});
        }
      }).catch((err)=>{
        res.status(400).send('Bad Request');
      });
}

var deleteUser=async(req,res)=>{

}

var updateUser=async(req,res)=>{
    const myuser ={
        username: req.body.username
    };
    
    await User.findOne({
        where: {username: myuser.username},
        attributes: ['id', ['username','user name']]
      }).then(async(usr)=> {
        if(usr){
            await User.update(myuser, {
                where: {
                    id: myuser.id
                }
            });
            res.status(409).json({user:usr,message:"user already exists"});
        }else{
            res.status(404).json({user:usr,message:"doest exists"});
        }
      }).catch((err)=>{
        res.status(400).send('Bad Request');
      });
}
var createUser=async(req,res)=>{

    const myuser ={
        username: req.body.username,
        hashedpassword: utils.hashpassword(req.body.password)
    } ;
    console.log(myuser.hashedpassword);
    const valid = validateUser(req.body);
    if(!valid) return res.status(400).send(error);

    await User.findOne({
        where: {username: myuser.username},
        attributes: ['id', ['username','user name']]
      }).then(function(usr) {
        if(usr){
            res.status(409).json({user:usr,message:"user already exists"});
        }else{
            User.create(myuser).then((data)=>{
                console.log('user created');
                res.status(201).json({user:data,message:"user created successfully"});
            }).catch((err)=>{
                res.status(400).send('Bad Request');
            });
        }
      }).catch((err)=>{
        res.status(400).send('Bad Request');
      });
   
} 
var purgeUsers=async ()=>{
    await Post.destroy({
        truncate: true
    }).then(async()=>{
        await User.destroy({
            truncate: true
          });
    });
    
}
var updateImg=async(mage)=>{
    var image=require('./utils/index');

    var mage=image.getBase64ImageFile("../france.jpeg");

    await User.update({ img: mage }, {
        where: {
            img: null
        }
    });
}
module.exports={
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
    createUser,
    purgeUsers,
    updateImg,
    login
}

