const Sequelize = require('sequelize');
const sequelize = require('../models/database');

const tipoNoticiaController = {};

tipoNoticiaController.list = async (req, res) => {
    try {
        const query = 'SELECT * FROM tipo_noticia;';
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        res.json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

tipoNoticiaController.create = async (req, res) => {
    const { tipo_noticia_param } = req.body;

    try {
        const query = `
        CALL InserirTipoNoticia('${tipo_noticia_param}')
      `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Tipo de notícia criado com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

tipoNoticiaController.update = async (req, res) => {
    const { id } = req.params;
    const { novo_tipo_noticia_param } = req.body;

    try {
        const query = `
        CALL AtualizarTipoNoticia(${id}, '${novo_tipo_noticia_param}')
      `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Tipo de notícia atualizado com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = tipoNoticiaController;