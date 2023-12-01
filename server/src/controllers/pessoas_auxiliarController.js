const Sequelize = require('sequelize');
const sequelize = require('../models/database');

const pessoasAuxiliarController = {};

pessoasAuxiliarController.getId = async (req, res) => {
    const { id } = req.params;

    try {
        const query = `SELECT * FROM pessoas_auxiliar WHERE id_pessoas_auxiliar = ${id}`;
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        if (data.length > 0) {
            res.json({ success: true, data: data });
        } else {
            res.status(404).json({ success: false, message: 'Dados auxiliar não encontrados' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

pessoasAuxiliarController.create = async (req, res) => {
    const {
        nome_auxiliar_param,
        email_auxiliar_param
    } = req.body;

    const id_pessoa_param = req.userId;

    try {
        const query = `
        CALL InserirPessoaAuxiliar(
          ${id_pessoa_param},
          '${nome_auxiliar_param}',
          '${email_auxiliar_param}'
        )
      `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Dados auxiliares criados com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = pessoasAuxiliarController;