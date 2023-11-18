const Sequelize = require('sequelize');
const sequelize = require('../models/database');
const Pessoas = require('../models/pessoas');

const pessoasController = {};

pessoasController.list = async (req, res) => {
    try {
        const query = 'SELECT * FROM pessoas;';
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        res.json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

pessoasController.getId = async (req, res) => {
    const { id } = req.params;

    try {
        const query = `SELECT * FROM pessoas WHERE id_pessoa = ${id}`;
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        if (data.length > 0) {
            res.json({ success: true, data: data });
        } else {
            res.status(404).json({ success: false, message: 'Pessoa não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

pessoasController.create = async (req, res) => {
    const {
        pes_id_param,
        id_tipo_param,
        nome_pessoa_param,
        email_param,
        password_param,
        cliente_param,
        ativa_param,
        deleted_param,
        curriculo_param,
        numero_colaborador_param,
        contribuinte_param
    } = req.body;

    try {
        const query = `
        CALL InserirPessoa(
          ${pes_id_param},
          ${id_tipo_param},
          '${nome_pessoa_param}',
          '${email_param}',
          '${password_param}',
          '${cliente_param}',
          ${ativa_param},
          ${deleted_param},
          '${curriculo_param}',
          ${numero_colaborador_param},
          '${contribuinte_param}'
        )
      `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Pessoa criada com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

pessoasController.update = async (req, res) => {
    const { id } = req.params;

    const {
        nome_pessoa_param,
        pass_pessoa_param,
        email_param,
        ativa_param,
        deleted_param,
        curriculo_param,
        cliente_param
    } = req.body;

    try {
        const query = `
        CALL AtualizarPessoa(
          ${id},
          ${nome_pessoa_param ? `'${nome_pessoa_param}'` : 'NULL'},
          ${pass_pessoa_param ? `'${pass_pessoa_param}'` : 'NULL'},
          ${email_param ? `'${email_param}'` : 'NULL'},
          ${ativa_param !== undefined ? ativa_param : 'NULL'},
          ${deleted_param !== undefined ? deleted_param : 'NULL'},
          ${curriculo_param ? `'${curriculo_param}'` : 'NULL'},
          ${cliente_param ? `'${cliente_param}'` : 'NULL'}
        )
      `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Pessoa atualizada com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = pessoasController;
