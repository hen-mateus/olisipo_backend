const Sequelize = require('sequelize');
const sequelize = require('../models/database');

const parceriasController = {};

parceriasController.list = async (req, res) => {
    try {
        const query = 'SELECT parcerias.*, tipo_parceria.tipo_parceria FROM parcerias INNER JOIN tipo_parceria ON parcerias.id_tipo_parceria = tipo_parceria.id_tipo_parceria;';
        const data1 = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
        const query1 = 'SELECT * FROM tipo_parceria;';
        const data2 = await sequelize.query(query1, { type: Sequelize.QueryTypes.SELECT });

        res.json({ success: true, data1: data1,data2:data2 });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
parceriasController.getId = async (req, res) => {
    const { id } = req.params;

    try {
        const query = `SELECT * FROM parcerias WHERE id_parceria = ${id}`;
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        if (data.length > 0) {
            res.json({ success: true, data: data });
        } else {
            res.status(404).json({ success: false, message: 'Parceria não encontrada' });
        }
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
          ${nova_publicacao_param !== undefined ? nova_publicacao_param : 'NULL'}
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
