const Sequelize = require('sequelize');
const sequelize = require('../models/database');
const DespesasViatura = require('../models/despesas_viatura_propria');

const despesasViaturaController = {};

despesasViaturaController.list = async (req, res) => {
    try {
        const query = 'SELECT despesas_viatura_propria.*, pessoas.nome_pessoa FROM despesas_viatura_propria INNER JOIN pessoas ON despesas_viatura_propria.id_pessoa = pessoas.id_pessoa WHERE NOT EXISTS ( SELECT 1 FROM relacao_despesas_estado WHERE relacao_despesas_estado.id_despesa = despesas_viatura_propria.id_despesa AND relacao_despesas_estado.id_estado IN (1, 2) );';
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        res.json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

despesasViaturaController.getId = async (req, res) => {
    const { id } = req.params;
    try {
        const query = `SELECT * FROM despesas_viatura_propria WHERE id_despesa = ${id}`;
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        if (data.length > 0) {
            res.json({ success: true, data: data });
        } else {
            res.status(404).json({ success: false, message: 'Despesa não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

despesasViaturaController.create = async (req, res) => {
    const {

        quilometros_param,
        data_deslocacao_param,
        ponto_origem_param,
        ponto_chegada_param,
        confirmacao_despesas_param
    } = req.body;
    
    const id_pessoa_param = req.userId;

    try {
        const query = `
        CALL InserirDespesaViatura(
          ${id_pessoa_param},
          ${quilometros_param},
          '${data_deslocacao_param}',
          '${ponto_origem_param}',
          '${ponto_chegada_param}',
          ${confirmacao_despesas_param}
        )
      `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Despesa inserida com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


module.exports = despesasViaturaController;