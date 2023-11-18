const Sequelize = require('sequelize');
const sequelize = require('../models/database');

const tipoParceriaController = {};

tipoParceriaController.list = async (req, res) => {
    try {
        const query = 'SELECT * FROM tipo_parceria;';
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        res.json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

tipoParceriaController.create = async (req, res) => {
    const { tipo_parceria_param } = req.body;

    try {
        const query = `
        CALL InserirTipoParceria('${tipo_parceria_param}')
      `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Tipo de parceria criado com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

tipoParceriaController.update = async (req, res) => {
    const { id } = req.params;
    const { novo_tipo_parceria_param } = req.body;

    try {
        const query = `
        CALL AtualizarTipoParceria(${id}, '${novo_tipo_parceria_param}')
      `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Tipo de parceria atualizado com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = tipoParceriaController;