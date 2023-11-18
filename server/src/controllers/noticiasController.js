const Sequelize = require('sequelize');
const sequelize = require('../models/database');

const noticiasController = {};

noticiasController.list = async (req, res) => {
    try {
        const query = 'SELECT * FROM noticias;';
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        res.json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


noticiasController.create = async (req, res) => {
    const {
        id_tipo_noticia_param,
        titulo_noticia_param,
        subtitulo_noticia_param,
        corpo_noticia_param,
        imagem_noticia_param,
        noticia_publicada_param
    } = req.body;

    try {
        const query = `
        CALL InserirNoticia(
          ${id_tipo_noticia_param},
          '${titulo_noticia_param}',
          '${subtitulo_noticia_param}',
          '${corpo_noticia_param}',
          '${imagem_noticia_param}',
          '${noticia_publicada_param}'
        )
      `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Noticia criada com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

noticiasController.update = async (req, res) => {
    const { id } = req.params;

    const {
        novo_id_tipo_noticia_param,
        novo_titulo_param,
        novo_subtitulo_param,
        novo_corpo_param,
        nova_imagem_param,
        nova_publicacao_param
    } = req.body;

    try {
        const query = `
        CALL AtualizarNoticia(
          ${id},
          ${novo_id_tipo_noticia_param !== undefined ? novo_id_tipo_noticia_param : 'NULL'},
          ${novo_titulo_param ? `'${novo_titulo_param}'` : 'NULL'},
          ${novo_subtitulo_param ? `'${novo_subtitulo_param}'` : 'NULL'},
          ${novo_corpo_param ? `'${novo_corpo_param}'` : 'NULL'},
          ${nova_imagem_param ? `'${nova_imagem_param}'` : 'NULL'},
          ${nova_publicacao_param ? `'${nova_publicacao_param}'` : 'NULL'}
        )
      `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Noticia atualizada com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

noticiasController.delete = async (req, res) => {
    const {
        id_noticia_param
    } = req.body;
    try {
        const query = `
        CALL ExcluirNoticia(
          ${id_noticia_param}
        )
      `;
        await sequelize.query(query);
        res.json({ success: true, message: 'Noticia apagada com sucesso!', deleted: query });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = noticiasController;
