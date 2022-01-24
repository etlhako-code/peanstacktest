const {DataTypes, Model , Sequelize} = require('sequelize');
const { validate } = require('./index');
const db=require('./index');


var Order=db.define('Order',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    totalPrice:{
       type: DataTypes.NUMBER,
       validate: {
        min:1
      }
    },
    deliverdate:{
        type: DataTypes.DATE,
        validate:{
            isAfter: Date.now(),
        }
    },
    orderstatus:{
        type: DataTypes.STRING,
        validate:{
            isIn: ['dilivered', 'pending', 'shipped'],
        }
    },
    qty:{
        type: DataTypes.NUMBER,
        validate:{
            min: 1
        }
    }
  },{}
);

/* Post.belongsTo(User,{foreignKey: 'fk_user',onDelete:'CASCADE'}); */
module.exports=Order;