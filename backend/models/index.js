//postgresql
var {Sequelize} = require('sequelize');
/* postgreslink="postgres://dev:12345@localhost:5432/moviesdb";
var sequelize = new Sequelize(postgreslink);
 */

module.exports= new Sequelize(process.env.DB_DATABASE||'movieReviews', process.env.DB_USER||'root', process.env.DB_PASSWORD||'12345', {
    host: process.env.DB_HOST||'localhost',
    port: process.env.DB_PORT||'5432',
    dialect: 'postgres',
    logging: false,
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
    },
    pool:{
        min: 0,
        max: 20,
        acquire:30000,
        idle: 1000
    }
});