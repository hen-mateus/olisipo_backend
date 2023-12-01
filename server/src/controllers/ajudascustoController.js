const Sequelize = require('sequelize');
const sequelize = require('../models/database');

const ajudasCustoController = {};

ajudasCustoController.list = async (req, res) => {
    try {
        const query = 'SELECT ajudas_custo.*, pessoas.nome_pessoa FROM ajudas_custo INNER JOIN pessoas ON ajudas_custo.id_pessoa = pessoas.id_pessoa;';
        const data = await sequelize.query(query, {
            type: Sequelize.QueryTypes.SELECT
        });

        res.json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

ajudasCustoController.getId = async (req, res) => {
    const { id } = req.params;

    try {
        const query = `SELECT * FROM ajudas_custo WHERE id_ajuda_custo = ${id}`;
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        if (data.length > 0) {
            res.json({ success: true, data: data });
        } else {
            res.status(404).json({ success: false, message: 'Ajuda de custo não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

ajudasCustoController.create = async (req, res) => {
    const {
        valor_ajuda_param,
        descritivo_ajuda_param,
        fatura_ajuda_param,
        confirmacao_despesas_param
    } = req.body;

    const id_pessoa_param = req.userId;

    try {
        const query = `
        CALL InserirAjudaCusto(
          ${id_pessoa_param},
          ${valor_ajuda_param},
          '${descritivo_ajuda_param}',
          '${fatura_ajuda_param}',
          ${confirmacao_despesas_param}
        )
      `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Ajuda de Custo inserida com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = ajudasCustoController;