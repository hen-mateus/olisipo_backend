const Sequelize = require('sequelize');
const sequelize = require('../models/database');

const parceriasController = {};

parceriasController.list = async (req, res) => {
    try {
        const query = 'SELECT * FROM parcerias;';
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        res.json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


parceriasController.create = async (req, res) => {
    const {
        id_tipo_parceria_param,
        nome_parceria_param,
        descricao_parceria_param,
        beneficios_parceria_param,
        imagem_parceria_param,
        parceria_publicada_param
    } = req.body;

    try {
        const query = `
        CALL Inserirparceria(
          ${id_tipo_parceria_param},
          '${nome_parceria_param}',
          '${descricao_parceria_param}',
          '${beneficios_parceria_param}',
          '${imagem_parceria_param}',
          '${parceria_publicada_param}'
        )
      `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Parceria criada com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

parceriasController.update = async (req, res) => {
    const { id } = req.params;

    const {
        novo_id_tipo_parceria_param,
        novo_nome_param,
        nova_descricao_param,
        novos_beneficios_param,
        nova_imagem_param,
        nova_publicacao_param
    } = req.body;

    try {
        const query = `
        CALL AtualizarParceria(
          ${id},
          ${novo_id_tipo_parceria_param !== undefined ? novo_id_tipo_parceria_param : 'NULL'},
          ${novo_nome_param ? `'${novo_nome_param}'` : 'NULL'},
          ${nova_descricao_param ? `'${nova_descricao_param}'` : 'NULL'},
          ${novos_beneficios_param ? `'${novos_beneficios_param}'` : 'NULL'},
          ${nova_imagem_param ? `'${nova_imagem_param}'` : 'NULL'},
          ${nova_publicacao_param !== null ? nova_publicacao_param : 'NULL'}
        )
      `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Parceria atualizada com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

parceriasController.delete = async (req, res) => {
    const {
        id_parceria_param
    } = req.body;
    try {
        const query = `
        CALL ExcluirParceria(
          ${id_parceria_param}
        )
      `;
        await sequelize.query(query);
        res.json({ success: true, message: 'Parceria apagada com sucesso!'});
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = parceriasController;
