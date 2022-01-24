const {DataTypes, Model , Sequelize} = require('sequelize');
const db=require('./index');


var Address=db.define('Address',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    postalcode:{
       type: DataTypes.NUMBER,
       validate: {
        min:1
      }
    },
    city:{
        type: DataTypes.STRING,
       
    },
    streetname:{
        type: DataTypes.STRING,
        
    },
    streetnumber:{
        type: DataTypes.NUMBER
    },
    surburb:{
        type: DataTypes.STRING
    }
  },{}
);

/* Post.belongsTo(User,{foreignKey: 'fk_user',onDelete:'CASCADE'}); */
module.exports=Address;