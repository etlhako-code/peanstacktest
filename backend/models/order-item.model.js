const {DataTypes, Model , Sequelize} = require('sequelize');
const db=require('./index');


var Orderitem=db.define('Orderitem',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    qty:{
       type: DataTypes.NUMBER,
       validate: {
        min:1
      }
    }
  },{}
);

/* Post.belongsTo(User,{foreignKey: 'fk_user',onDelete:'CASCADE'}); */
module.exports=Orderitem;