const Sequelize = require('sequelize');
const sequelize = require('../models/database');

const reuniaoRHController = {};

reuniaoRHController.list = async (req, res) => {
    try {
        const query = 'SELECT reuniao_rh.*, pessoa_info_1.nome_pessoa AS nome_pessoa_1, tipo_pessoa_1.tipo AS tipo_pessoa_1, pessoa_info_2.nome_pessoa AS nome_pessoa_2, tipo_pessoa_2.tipo AS tipo_pessoa_2 FROM reuniao_rh JOIN relacao_pessoas_reuniao AS pessoa1 ON reuniao_rh.id_reuniao = pessoa1.id_reuniao JOIN pessoas AS pessoa_info_1 ON pessoa1.id_pessoa = pessoa_info_1.id_pessoa JOIN tipo_de_pessoas AS tipo_pessoa_1 ON pessoa_info_1.id_tipo = tipo_pessoa_1.id_tipo JOIN relacao_pessoas_reuniao AS pessoa2 ON reuniao_rh.id_reuniao = pessoa2.id_reuniao JOIN pessoas AS pessoa_info_2 ON pessoa2.id_pessoa = pessoa_info_2.id_pessoa JOIN tipo_de_pessoas AS tipo_pessoa_2 ON pessoa_info_2.id_tipo = tipo_pessoa_2.id_tipo WHERE pessoa1.id_pessoa < pessoa2.id_pessoa AND confirmar_reuniao is null;';
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        res.json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

reuniaoRHController.getId = async (req, res) => {
    const { id } = req.params;

    try {
        const query = `SELECT * FROM reuniao_rh WHERE id_reuniao = ${id}`;
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        if (data.length > 0) {
            res.json({ success: true, data: data });
        } else {
            res.status(404).json({ success: false, message: 'Reunião não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

reuniaoRHController.create = async (req, res) => {
    const {
        data_reuniao_param,
        motivo_param,
        horas_param
    } = req.body;

    const id_pessoa_param = req.userId;

    try {
        const obterUltimoIdQuery = `
            SELECT MAX(id_reuniao) AS ultimo_id
            FROM reuniao_rh;
        `;

        const [ultimoIdResult] = await sequelize.query(obterUltimoIdQuery);
        const ultimoId = ultimoIdResult[0].ultimo_id || 0;

        const novoIdReuniao = ultimoId + 1;

        const inserirReuniaoQuery = `
            CALL InserirReuniaoRH(
                '${data_reuniao_param}',
                '${motivo_param}',
                '${horas_param}'
            );
        `;
        await sequelize.query(inserirReuniaoQuery);

        const obterPesIdQuery = `
            SELECT pes_id_pessoa
            FROM pessoas
            WHERE id_pessoa = ${id_pessoa_param};
        `;

        const [pesIdResult] = await sequelize.query(obterPesIdQuery);

        if (pesIdResult.length > 0 && pesIdResult[0].pes_id_pessoa !== undefined) {
            const pes_id_pessoa_param = pesIdResult[0].pes_id_pessoa;

            const inserirRelacaoManQuery = `
                CALL inserirrelacaopessoasreuniao_man(
                    ${pes_id_pessoa_param},
                    ${novoIdReuniao}
                );
            `;
            await sequelize.query(inserirRelacaoManQuery);

            const inserirRelacaoColQuery = `
                CALL inserirrelacaopessoasreuniao_col(
                    ${id_pessoa_param},
                    ${novoIdReuniao}
                );
            `;
            await sequelize.query(inserirRelacaoColQuery);

            res.json({ success: true, message: 'Reunião inserida com sucesso!' });
        } else {
            res.status(404).json({ success: false, error: 'Pes_id_pessoa não encontrado para o id_pessoa informado.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


reuniaoRHController.update = async (req, res) => {
    const { id } = req.params;

    const {
        confirmar_reuniao
    } = req.body;

    try {
        const query = `UPDATE reuniao_rh SET confirmar_reuniao = ${confirmar_reuniao} where id_reuniao = ${id}`;

        await sequelize.query(query);

        res.json({ success: true, message: 'Reunião atualizada com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = reuniaoRHController;