var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var app = express();

var User = require('./models/user.model');
var Product =require('./models/Product.model');

var userRoutes=require('./routes/users');
var authRoutes=require('./routes/auth');
var prodRoutes=require('./routes/products');
//db test
//db connection
const db=require('./models');
//const User = require('./models/user.model');
async function dbcon()
{
    try {
       
        /*Post.sync({alter:true}); */
       
        await db.authenticate();
        console.log('Connection has been established successfull.');
        await Product.sync({alter:true});
        
        await User.sync({alter:true});

       

    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.abort();
    }
}
dbcon();
  
//logger
if (process.env.NODE_ENV !== 'development') {
    app.use(logger('dev'));
}
//express standard middle 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/users/',userRoutes);
app.use('/api/v1/auth/',authRoutes);
app.use('api/v1/products/',prodRoutes);


module.exports = app;
