const Sequelize = require('sequelize');
const sequelize = require('../models/database');

const notificacoesController = {};

notificacoesController.list = async (req, res) => {
    try {
        const query = 'SELECT * FROM notificacoes_nao_lidas ;';
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        res.json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
module.exports = notificacoesController;