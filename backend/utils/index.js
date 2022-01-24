const bcrypt = require('bcrypt');
const imageToBase64 = require('image-to-base64');
const jwt=require('jsonwebtoken');
const Joi = require('@hapi/joi');

exports.hashpassword=(pass)=>{
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(pass, salt);

    return hash;
}

exports.getBase64ImageFile = (filePathOrUrl) => {
    
    //or
    //import imageToBase64 from 'image-to-base64/browser';
    
    imageToBase64(filePathOrUrl) // Path to the image
        .then(
            (response) => {
                console.log(response); // "cGF0aC90by9maWxlLmpwZw=="
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
}

exports.notFound=(req, res, next)=>{
    res.status(404);
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    next(error);
  }
  
  /* eslint-disable no-unused-vars */
exports.errorHandler=(err, req, res, next)=>{
    /* eslint-enable no-unused-vars */
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
}

  //hapi joi validation 
exports.validateUser=(user)=>{
    //validaion user schema
    const valUserSchema={
      name:Joi.string().min(3).required(),
      email: Joi.string().min(5).required().email(),
      lastname:Joi.string().min(3).required(),
      cellno:Joi.string().min(10).max(11).required(),
      password: Joi.string().min(5).required()
      
    }
    const {error}= Joi.validate(user,valUserSchema);
    return error ? error.details[0].message : null;
}
exports.validateUserLogin=(user)=>{
    const valUserSchema={
        email: Joi.string().min(5).required().email(),
        password: Joi.string().min(5).required()
    }
    const {error}= Joi.validate(user,valUserSchema);
    return error ? error.details[0].message : null;
}  
  // jwt auth tokenization
exports.createToken=(data)=>{
     const token= jwt.sign(data,process.env.JWT_SECRETKEY,{
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
}
exports.validateToken=(req,res,next)=>{
    try {
      var decoded = jwt.verify(token,process.env.JWT_SECRETKEY);
      //return decoded ? decoded : false;
      req.user=decoded ? decoded : false;
      next();
    } catch(err) {
          return next(err);    // err
    }
}
exports.validateUserToken=(req,res,next)=>{
    try {
      var decoded = jwt.verify(token,process.env.JWT_SECRETKEY);
      //return decoded ? decoded : false;
      req.user=decoded ? decoded : false;
      next();
    } catch(err) {
          return next(err);    // err
    }
}

exports.validateProduct=(product)=>{
    const valProdSchema={
        prodname:Joi.string().min(3).required(),
        shortdesc:Joi.string().min(3).required(),
        longdesc:Joi.string().min(3).required(),
        price:Joi.number().required().min(1).precision(2),
        category:Joi.string().min(3).required()
      }
      const {error}= Joi.validate(product,valProdSchema);
      return error ? error.details[0].message : null;
}