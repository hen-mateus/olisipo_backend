const Sequelize = require('sequelize');
const sequelize = require('../models/database');

const estadosController = {};

estadosController.listComPagamento = async (req, res) => {
    try {
        const query = 'SELECT tipo_estado FROM vista_estados_com_pagamento;';
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        res.json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

estadosController.listSemPagamento = async (req, res) => {
    try {
        const query = 'SELECT tipo_estado FROM vista_estados_sem_pagamento;';
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        res.json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = estadosController;