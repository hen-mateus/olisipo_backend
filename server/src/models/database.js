var Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'olisipo_pi4',
    'postgres',
    'henrique77',
    {
        host: 'localhost',
        port: '5432',
        dialect: 'postgres'
    }
);

module.exports = sequelize;