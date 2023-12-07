const Sequelize = require('sequelize');
const sequelize = require('../models/database');

const relacaoEstadosController = {};

relacaoEstadosController.createHoras = async (req, res) => {
    const {
        id_horas,
        id_estado,
    } = req.body;

    try {
        const query = `
        INSERT INTO RELACAO_HORAS_ESTADO (ID_ESTADO, ID_RELATORIO_HORAS, DATA_ESTADO_RELATORIO_HORAS)
        VALUES (${id_estado}, ${id_horas}, current_date);
      `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Relação entre horas e estados feita com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

relacaoEstadosController.createAjudas = async (req, res) => {
    const {
        id_ajudas,
        id_estado,
    } = req.body;

    try {
        const query = `
        INSERT INTO RELACAO_AJUDAS_ESTADO (ID_ESTADO, ID_AJUDA_CUSTO, DATA_ESTADO_AJUDASCUSTO)
        VALUES (${id_estado}, ${id_ajudas}, current_date);
      `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Relação entre ajudas de custo e estados feita com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

relacaoEstadosController.createDespesasViatura = async (req, res) => {
    const {
        id_despesasviatura,
        id_estado,
    } = req.body;

    try {
        const query = `
        INSERT INTO RELACAO_DESPESAS_ESTADO (ID_ESTADO, ID_DESPESA, DATA_ESTADO_DESPESAS)
        VALUES (${id_estado}, ${id_despesasviatura}, current_date);
      `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Relação entre despesas de viatura própria e estados feita com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

relacaoEstadosController.createFaltas = async (req, res) => {
    const {
        id_faltas,
        id_estado,
    } = req.body;

    try {
        const query = `
        INSERT INTO RELACAO_FALTAS_ESTADO (ID_ESTADO, ID_FALTA, DATA_ESTADO_FALTA)
        VALUES (${id_estado}, ${id_faltas}, current_date);
      `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Relação entre faltas e estados feita com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

relacaoEstadosController.createFerias = async (req, res) => {
    const {
        id_ferias,
        id_estado,
    } = req.body;

    try {
        const query = `
        INSERT INTO RELACAO_FERIAS_ESTADO (ID_ESTADO, ID_FERIAS, DATA_ESTADO_FERIAS)
        VALUES (${id_estado}, ${id_ferias}, current_date);
      `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Relação entre férias e estados feita com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = relacaoEstadosController;