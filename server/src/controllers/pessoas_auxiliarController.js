const Sequelize = require('sequelize');
const sequelize = require('../models/database');

const pessoasAuxiliarController = {};

pessoasAuxiliarController.list = async (req, res) => {
    try {
        const query = 'SELECT pessoas_auxiliar.*, pessoas.nome_pessoa, pessoas.email FROM pessoas_auxiliar INNER JOIN pessoas ON pessoas_auxiliar.id_pessoa = pessoas.id_pessoa AND confirmar_dados is null;';
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        res.json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

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

pessoasAuxiliarController.update = async (req, res) => {
    const { id } = req.params;

    const {
        confirmar_dados
    } = req.body;

    try {
        const query = `UPDATE pessoas_auxiliar SET confirmar_dados = ${confirmar_dados} where id_pessoas_auxiliar = ${id}`;

        await sequelize.query(query);

        res.json({ success: true, message: 'Dados atualizados com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = pessoasAuxiliarController;