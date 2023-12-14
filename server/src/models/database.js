const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'db_portal_olisipo',
    'db_portal_olisipo',
    'qflG7GsWqMA9hqwYxzwnAvSbDs9l70ht',
    {
        host: 'dpg-cltist8cmk4c738sp7ag-a.oregon-postgres.render.com',
        port: 5432,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
);

module.exports = sequelize;
