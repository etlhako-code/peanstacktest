const {DataTypes, Model , Sequelize} = require('sequelize');
const db=require('./index');

var User=db.define('User',{
  // Model attributes are defined here
  id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        validate:{
            is:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        }
    },
    name:{
        type:DataTypes.STRING
    },
    lastname:{
        type:DataTypes.STRING,
        allowNull:true,
        validate:{
            notEmpty: true
        }
    },
    cellno:{
        type:DataTypes.STRING
    },
    hashedPassword: {
        type: DataTypes.STRING(64),
        validate: {
        is: /^\$2[ayb]\$.{56}$/i
        }
    },
    img:{
        type: DataTypes.BLOB
    }
    },{
  modelName: 'User' // We need to choose the model name
});

module.exports= User;
    

