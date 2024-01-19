const Sequelize = require('sequelize');
const sequelize = require('../models/database');

const notificacoesController = {};

notificacoesController.list = async (req, res) => {
    try {
        const query = `SELECT tipos_possiveis.tipo_notificacao, COALESCE(COUNT(notificacoes.id_notificacao), 0) AS quantidade_nao_lida FROM ( SELECT 'Ajudas de Custo' AS tipo_notificacao UNION SELECT 'Pedidos de Férias' UNION SELECT 'Relatórios de Horas' UNION SELECT 'Alteração de Dados' UNION SELECT 'Recibos por submeter' UNION SELECT 'Reuniões' UNION SELECT 'Gastos em Viatura Própria' ) AS tipos_possiveis LEFT JOIN notificacoes ON tipos_possiveis.tipo_notificacao = notificacoes.tipo_notificacao AND notificacoes.notificacao_lida = FALSE GROUP BY tipos_possiveis.tipo_notificacao; `;
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        res.json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

notificacoesController.listManager = async (req, res) => {
    const id_pessoa_param = req.userId;

    try {
        const query = `SELECT tipos_possiveis.tipo_notificacao, 
       COALESCE(COUNT(notificacoes.id_notificacao), 0) AS quantidade_nao_lida 
FROM (
    SELECT 'Reuniões' AS tipo_notificacao 
) AS tipos_possiveis 
LEFT JOIN notificacoes ON tipos_possiveis.tipo_notificacao = notificacoes.tipo_notificacao 
                      AND notificacoes.notificacao_lida = FALSE 
WHERE notificacoes.id_pessoa = ${id_pessoa_param}
GROUP BY tipos_possiveis.tipo_notificacao;

          `;
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        res.json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

notificacoesController.marcarTodasComoLidas = async (req, res) => {
    try {
        // Atualiza todas as notificações para notificacao_lida = true
        await sequelize.query('UPDATE notificacoes SET notificacao_lida = TRUE', { type: Sequelize.QueryTypes.UPDATE });

        res.json({ success: true, message: 'Todas as notificações marcadas como lidas.' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = notificacoesController;
