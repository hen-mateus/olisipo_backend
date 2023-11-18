const Sequelize = require('sequelize');
const sequelize = require('../models/database');

const horasController = {};

horasController.list = async (req, res) => {
    try {
        const query = 'SELECT * FROM relatorio_horas;';
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        res.json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

horasController.getId = async (req, res) => {
    const { id } = req.params;

    try {
        const query = `SELECT * FROM relatorio_horas WHERE id_relatorio_horas = ${id}`;
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        if (data.length > 0) {
            res.json({ success: true, data: data });
        } else {
            res.status(404).json({ success: false, message: 'Horas não encontradas' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

horasController.create = async (req, res) => {
    const {
        id_pessoa_param,
        data_relatorio_param,
        mes_param,
        horas_efetuadas_param,
        confirmacao_relatorio_param,
        ano_relatorio_param
    } = req.body;

    try {
        const query = `
        CALL InserirRelatorioHoras(
          ${id_pessoa_param},
          '${data_relatorio_param}',
          '${mes_param}',
          '${horas_efetuadas_param},
          '${confirmacao_relatorio_param}',
          '${ano_relatorio_param}'
        )
      `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Horas inseridas com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


module.exports = horasController;