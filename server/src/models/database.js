var Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'olisipo_pi4',
    'postgres',
    '',
    {
        host: 'localhost',
        port: '5432',
        dialect: 'postgres'
    }
);

module.exports = sequelize;
