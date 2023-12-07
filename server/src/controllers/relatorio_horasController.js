const Sequelize = require('sequelize');
const sequelize = require('../models/database');

const horasController = {};

horasController.list = async (req, res) => {
    try {
        const query = 'SELECT relatorio_horas.*, pessoas.nome_pessoa FROM relatorio_horas INNER JOIN pessoas ON relatorio_horas.id_pessoa = pessoas.id_pessoa WHERE NOT EXISTS ( SELECT 1 FROM relacao_horas_estado WHERE relacao_horas_estado.id_relatorio_horas = relatorio_horas.id_relatorio_horas AND relacao_horas_estado.id_estado IN (1, 2) );';
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
        data_relatorio_param,
        mes_param,
        horas_efetuadas_param,
        confirmacao_relatorio_param,
        ano_relatorio_param
    } = req.body;

    const id_pessoa_param = req.userId;

    try {
        const query = `
        CALL InserirRelatorioHoras(
          ${id_pessoa_param},
          '${data_relatorio_param}',
          '${mes_param}',
          '${horas_efetuadas_param}',
          ${confirmacao_relatorio_param},
          ${ano_relatorio_param}
        );
      `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Horas inseridas com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


module.exports = horasController;