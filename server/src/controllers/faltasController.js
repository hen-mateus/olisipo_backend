const Sequelize = require('sequelize');
const sequelize = require('../models/database');
const Faltas = require('../models/faltas');


const faltasController = {};

faltasController.list = async (req, res) => {
    try {
        const query = 'SELECT * FROM faltas;';
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        res.json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

faltasController.getId = async (req, res) => {
    const { id } = req.params;

    try {
        const query = `SELECT * FROM faltas WHERE id_falta = ${id}`;
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        if (data.length > 0) {
            res.json({ success: true, data: data });
        } else {
            res.status(404).json({ success: false, message: 'Falta não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

faltasController.create = async (req, res) => {
    const {
      
        data_falta_param,
        horas_faltadas_param,
        justificacao_param,
        confirmacao_faltas_param
    } = req.body;

    const id_pessoa_param = req.userId;
    try {
        const query = `
        CALL InserirFalta(
          ${id_pessoa_param},
          '${data_falta_param}',
          '${horas_faltadas_param}',
          '${justificacao_param}',
          ${confirmacao_faltas_param}
        )
      `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Falta inserida com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


module.exports = faltasController;