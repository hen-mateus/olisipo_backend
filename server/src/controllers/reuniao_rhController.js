const Sequelize = require('sequelize');
const sequelize = require('../models/database');

const reuniaoRHController = {};

reuniaoRHController.list = async (req, res) => {
    try {
        const query = 'SELECT * FROM reuniao_rh;';
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        res.json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

reuniaoRHController.getId = async (req, res) => {
    const { id } = req.params;

    try {
        const query = `SELECT * FROM reuniao_rh WHERE id_reuniao = ${id}`;
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        if (data.length > 0) {
            res.json({ success: true, data: data });
        } else {
            res.status(404).json({ success: false, message: 'Reunião não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

reuniaoRHController.create = async (req, res) => {
    const {
        data_reuniao_param,
        motivo_param,
        horas_param
    } = req.body;

    try {
        const query = `
        CALL InserirReuniaoRH(
          '${data_reuniao_param}',
          '${motivo_param}',
          '${horas_param}'
        )
      `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Reunião inserida com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


module.exports = reuniaoRHController;