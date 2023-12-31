const Sequelize = require('sequelize');
const sequelize = require('../models/database');
const Ferias = require('../models/ferias');

const feriasController = {};

feriasController.list = async (req, res) => {
    try {
        const query = 'SELECT ferias.*, pessoas.nome_pessoa, estados.tipo_estado FROM ferias INNER JOIN pessoas ON ferias.id_pessoa = pessoas.id_pessoa LEFT JOIN relacao_ferias_estado ON relacao_ferias_estado.id_ferias = ferias.id_ferias INNER JOIN estados ON estados.id_estado = relacao_ferias_estado.id_estado WHERE NOT EXISTS ( SELECT 1 FROM relacao_ferias_estado WHERE relacao_ferias_estado.id_ferias = ferias.id_ferias AND relacao_ferias_estado.id_estado IN (1, 2) );';
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        res.json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

feriasController.getId = async (req, res) => {
    const { id } = req.params;

    try {
        const query = `SELECT * FROM ferias WHERE id_ferias = ${id}`;
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        if (data.length > 0) {
            res.json({ success: true, data: data });
        } else {
            res.status(404).json({ success: false, message: 'Ferias não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

feriasController.create = async (req, res) => {
    const {
        
        data_inicio_param,
        data_fim_param,
        data_submissao_param,
        confirmacao_ferias_param
    } = req.body;

    const id_pessoa_param = req.userId;
    try {
        const query = `
        CALL InserirFerias(
          ${id_pessoa_param},
          '${data_inicio_param}',
          '${data_fim_param}',
          '${data_submissao_param}',
          ${confirmacao_ferias_param}
        )
      `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Ferias inseridas com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


module.exports = feriasController;