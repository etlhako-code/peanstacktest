const {DataTypes, Model , Sequelize} = require('sequelize');
const db=require('./index');


var Product=db.define('Product',{
    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    prodname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    shortdesc: {
      type: DataTypes.STRING()
    },
    longdesc: {
      type: DataTypes.STRING(1124)
    },
    price:{
       type: DataTypes.NUMBER,
       validate: {
        min:1
      }
    },
    category:{
        type:DataTypes.STRING,
        validate:{
            isIn: ['tech', 'fintech','health'],
        }
    },
    img:{
      type:DataTypes.BLOB,
      allowNull:true
    }
  },{}
);


  /* Post.belongsTo(User,{foreignKey: 'fk_user',onDelete:'CASCADE'}); */
 
  module.exports=Product;