const Sequelize = require('sequelize');
const sequelize = require('../models/database');
const ConteudosWebsite = require('../models/conteudos_website');

const conteudosWebsiteController = {};

conteudosWebsiteController.getId = async (req, res) => {
    const { id } = req.params;

    try {
        const query = `SELECT * FROM conteudos_website WHERE id_conteudo = ${id}`;
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        if (data.length > 0) {
            res.json({ success: true, data: data });
        } else {
            res.status(404).json({ success: false, message: 'Conteudo não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

conteudosWebsiteController.create = async (req, res) => {
    const {
        titulo_header_param,
        imagem_header_param,
        texto1_param,
        texto2_param,
        texto3_param,
        link1_param,
        texto_footer_param,
        link2_param,
        titulo_footer_param,
        titulo_seccao_param,
        imagem_seccao_param
    } = req.body;

    const id_pessoa_param = req.userId;
    try {
        const query = `
        CALL InserirConteudoWebsite(
          ${id_pessoa_param},
          '${titulo_header_param}',
          '${imagem_header_param}',
          '${texto1_param}',
          '${texto2_param}',
          '${texto3_param}',
          '${link1_param}',
          '${texto_footer_param}',
          '${link2_param}',
          '${titulo_footer_param}',
          '${titulo_seccao_param}',
          '${imagem_seccao_param}'
        )
      `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Secção inserida com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


conteudosWebsiteController.delete = async (req, res) => {
    const {
        id_conteudowebsite_param
    } = req.body;
    try {
        const query = `
        CALL ExcluirSeccaoWebsite(
          ${id_conteudowebsite_param}
        )
      `;
        await sequelize.query(query);
        res.json({ success: true, message: 'Secção apagada com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


conteudosWebsiteController.updateSeccao = async (req, res) => {
    const { id } = req.params;

    const {
        novo_texto1_param,
        novo_texto2_param,
        novo_texto3_param,
        novo_tituloseccao_param,
        novo_imagemseccao_param
    } = req.body;

    try {
        const query = `
        CALL AtualizarConteudoWebsiteSeccao(
          ${id},
          ${novo_texto1_param ? `'${novo_texto1_param}'` : 'NULL'},
          ${novo_texto2_param ? `'${novo_texto2_param}'` : 'NULL'},
          ${novo_texto3_param ? `'${novo_texto3_param}'` : 'NULL'},
          ${novo_tituloseccao_param ? `'${novo_tituloseccao_param}'` : 'NULL'},
          ${novo_imagemseccao_param ? `'${novo_imagemseccao_param}'` : 'NULL'}
        )
      `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Secção atualizada com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


conteudosWebsiteController.updateHeader = async (req, res) => {
    const { id } = req.params;

    const {
        novo_titulo_header_param,
        nova_imagem_header_param,
        novo_link1_param,
        novo_link2_param
    } = req.body;

    try {
        const query = `
        CALL AtualizarConteudoWebsiteHeader(
          ${id},
          ${novo_titulo_header_param ? `'${novo_titulo_header_param}'` : 'NULL'},
          ${nova_imagem_header_param ? `'${nova_imagem_header_param}'` : 'NULL'},
          ${novo_link1_param ? `'${novo_link1_param}'` : 'NULL'},
          ${novo_link2_param ? `'${novo_link2_param}'` : 'NULL'}
        )
      `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Header atualizada com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

conteudosWebsiteController.updateFooter = async (req, res) => {
    const { id } = req.params;

    const {
        novo_texto_footer_param,
        novo_titulo_footer_param,
        novo_link1_param,
        novo_link2_param
    } = req.body;

    try {
        const query = `
        CALL AtualizarConteudoWebsiteFooter(
          ${id},
          ${novo_texto_footer_param ? `'${novo_texto_footer_param}'` : 'NULL'},
          ${novo_titulo_footer_param ? `'${novo_titulo_footer_param}'` : 'NULL'},
          ${novo_link1_param ? `'${novo_link1_param}'` : 'NULL'},
          ${novo_link2_param ? `'${novo_link2_param}'` : 'NULL'}
        )
      `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Footer atualizada com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

conteudosWebsiteController.list = async (req, res) => {
    try {
        const query = 'SELECT * FROM conteudos_website where id_conteudo >=3;';
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        res.json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
module.exports = conteudosWebsiteController;