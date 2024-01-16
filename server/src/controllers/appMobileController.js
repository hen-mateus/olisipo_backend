const Sequelize = require('sequelize');
const sequelize = require('../models/database');

const appMobileController = {};

appMobileController.list = async (req, res) => {
    const id_pessoa_param = 1;

    try {
        const query = 'SELECT parcerias.*, tipo_parceria.tipo_parceria FROM parcerias INNER JOIN tipo_parceria ON parcerias.id_tipo_parceria = tipo_parceria.id_tipo_parceria WHERE parcerias.parceria_publicada = true;';
        const parcerias = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
        const query1 = 'SELECT * FROM tipo_parceria;';
        const tipoParcerias = await sequelize.query(query1, { type: Sequelize.QueryTypes.SELECT });

        const query2 = 'SELECT noticias.*, tipo_noticia.tipo_noticia FROM noticias INNER JOIN tipo_noticia ON noticias.id_tipo_noticia = tipo_noticia.id_tipo_noticia WHERE noticias.noticia_publicada = true;';
        const noticias = await sequelize.query(query2, { type: Sequelize.QueryTypes.SELECT });
        const query3 = 'SELECT * FROM tipo_noticia;';
        const tipoNoticias = await sequelize.query(query3, { type: Sequelize.QueryTypes.SELECT });

        const query4 = `SELECT tipo_de_pessoas.tipo FROM pessoas JOIN tipo_de_pessoas ON pessoas.id_tipo=tipo_de_pessoas.id_tipo WHERE id_pessoa = ${id_pessoa_param}`;
        const dadosPessoais = await sequelize.query(query4, { type: Sequelize.QueryTypes.SELECT });

        const query5 = `SELECT * FROM informacoes_profissionais WHERE id_pessoa = ${id_pessoa_param}`;
        const informacoesProfissionais = await sequelize.query(query5, { type: Sequelize.QueryTypes.SELECT });

        const query6 = `
		SELECT
           
            estados.tipo_estado,
            despesas_viatura_propria.data_deslocacao
        FROM pessoas
        LEFT JOIN despesas_viatura_propria ON despesas_viatura_propria.id_pessoa = pessoas.id_pessoa
        LEFT JOIN relacao_despesas_estado ON relacao_despesas_estado.id_despesa = despesas_viatura_propria.id_despesa
        LEFT JOIN estados ON relacao_despesas_estado.id_estado = estados.id_estado
        WHERE pessoas.id_pessoa =${id_pessoa_param}`;
        const despesasViatura = await sequelize.query(query6, { type: Sequelize.QueryTypes.SELECT });

        const query7 = `
		SELECT
            
            estados.tipo_estado,
            faltas.data_falta
        FROM pessoas
        LEFT JOIN faltas ON faltas.id_pessoa = pessoas.id_pessoa
        LEFT JOIN relacao_faltas_estado ON relacao_faltas_estado.id_falta = faltas.id_falta
        LEFT JOIN estados ON relacao_faltas_estado.id_estado = estados.id_estado
        WHERE pessoas.id_pessoa =${id_pessoa_param}`;
        const faltas = await sequelize.query(query7, { type: Sequelize.QueryTypes.SELECT });

        const query8 = `
		SELECT
           
            estados.tipo_estado,
            ferias.data_submissao
        FROM pessoas
        LEFT JOIN ferias ON ferias.id_pessoa = pessoas.id_pessoa
        LEFT JOIN relacao_ferias_estado ON relacao_ferias_estado.id_ferias = ferias.id_ferias
        LEFT JOIN estados ON relacao_ferias_estado.id_estado = estados.id_estado
        WHERE pessoas.id_pessoa =${id_pessoa_param}`;
        const ferias = await sequelize.query(query8, { type: Sequelize.QueryTypes.SELECT });

        const query9 = `
		SELECT
            
            estados.tipo_estado,
            relatorio_horas.data_relatorio_horas
        FROM pessoas
        LEFT JOIN relatorio_horas ON relatorio_horas.id_pessoa = pessoas.id_pessoa
        LEFT JOIN relacao_horas_estado ON relacao_horas_estado.id_relatorio_horas = relatorio_horas.id_relatorio_horas
        LEFT JOIN estados ON relacao_horas_estado.id_estado = estados.id_estado
        WHERE pessoas.id_pessoa =${id_pessoa_param}`;
        const horas = await sequelize.query(query9, { type: Sequelize.QueryTypes.SELECT });

        const query10 = `
		SELECT
            
            estados.tipo_estado,
            ajudas_custo.valor_ajuda
        FROM pessoas
        LEFT JOIN ajudas_custo ON ajudas_custo.id_pessoa = pessoas.id_pessoa
        LEFT JOIN relacao_ajudas_estado ON relacao_ajudas_estado.id_ajuda_custo = ajudas_custo.id_ajuda_custo
        LEFT JOIN estados ON relacao_ajudas_estado.id_estado = estados.id_estado
        WHERE pessoas.id_pessoa =${id_pessoa_param}`;
        const ajudas = await sequelize.query(query10, { type: Sequelize.QueryTypes.SELECT });

        const query11 = `
		SELECT
            reuniao_rh.*,
            pessoa_info_1.nome_pessoa AS nome_pessoa_1,
            tipo_pessoa_1.tipo AS tipo_pessoa_1,
            pessoa_info_2.nome_pessoa AS nome_pessoa_2,
            tipo_pessoa_2.tipo AS tipo_pessoa_2
        FROM reuniao_rh
        JOIN relacao_pessoas_reuniao AS pessoa1 ON reuniao_rh.id_reuniao = pessoa1.id_reuniao
        JOIN pessoas AS pessoa_info_1 ON pessoa1.id_pessoa = pessoa_info_1.id_pessoa
        JOIN tipo_de_pessoas AS tipo_pessoa_1 ON pessoa_info_1.id_tipo = tipo_pessoa_1.id_tipo
        JOIN relacao_pessoas_reuniao AS pessoa2 ON reuniao_rh.id_reuniao = pessoa2.id_reuniao
        JOIN pessoas AS pessoa_info_2 ON pessoa2.id_pessoa = pessoa_info_2.id_pessoa
        JOIN tipo_de_pessoas AS tipo_pessoa_2 ON pessoa_info_2.id_tipo = tipo_pessoa_2.id_tipo
        WHERE
            (
                pessoa1.id_pessoa = ${id_pessoa_param}
                OR pessoa2.id_pessoa = ${id_pessoa_param}
            )
            AND pessoa1.id_pessoa < pessoa2.id_pessoa
            AND reuniao_rh.confirmar_reuniao IS NULL;`;
        const reunioes = await sequelize.query(query11, { type: Sequelize.QueryTypes.SELECT });


        const query12 = `SELECT *
        FROM recibos_vencimento
        WHERE id_pessoa =
        ${id_pessoa_param} and confirmacao_submissao_recibo= true;`;
        const recibos = await sequelize.query(query12, { type: Sequelize.QueryTypes.SELECT });

        res.json({ success: true, parcerias: parcerias, tipoParcerias: tipoParcerias, noticias: noticias, tipoNoticias: tipoNoticias, dadosPessoais: dadosPessoais, informacoesProfissionais: informacoesProfissionais, despesasViatura: despesasViatura, faltas: faltas, ferias: ferias, horas: horas, ajudas: ajudas, reunioes: reunioes, recibos: recibos });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};








module.exports = appMobileController;
