const Sequelize = require('sequelize');
const sequelize = require('../models/database');


const tipoPessoaController = {};

tipoPessoaController.list = async (req, res) => {
    try {
        const query = 'SELECT * FROM tipo_de_pessoas;';
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        res.json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = tipoPessoaController;