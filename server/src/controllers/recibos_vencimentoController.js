const Sequelize = require('sequelize');
const sequelize = require('../models/database');
const cron = require('node-cron');

const recibosVencimentoController = {};

recibosVencimentoController.list = async (req, res) => {
    try {
        const query = 'SELECT recibos_vencimento.*, pessoas.nome_pessoa FROM recibos_vencimento INNER JOIN pessoas ON recibos_vencimento.id_pessoa = pessoas.id_pessoa AND confirmacao_submissao_recibo = false;';
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        res.json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

recibosVencimentoController.getId = async (req, res) => {
    const { id } = req.params;

    try {
        const query = `SELECT * FROM recibos_vencimento WHERE id_recibo = ${id}`;
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        if (data.length > 0) {
            res.json({ success: true, data: data });
        } else {
            res.status(404).json({ success: false, message: 'Recibo não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

recibosVencimentoController.create = async (req, res) => {
    const id_pessoa_param = req.userId;

    const {
        recibo_pdf_param,
        confirmacao_submissao_recibo_param,
        data_recibo_param
    } = req.body;

    try {
        const query = `
        CALL InserirReciboVencimento(
            CURRENT_TIMESTAMP,
          '${recibo_pdf_param}',
          ${id_pessoa_param},
          '${confirmacao_submissao_recibo_param}',
          '${data_recibo_param}'
        )
      `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Recibo criado com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

recibosVencimentoController.update = async (req, res) => {
    const { id } = req.params;

    const {
        id_pessoa_param,
        data_submissao_recibo_param,
        recibo_pdf_param,
        confirmacao_submissao_recibo_param,
        data_recibo_param
    } = req.body;

    try {
        const query = `
        CALL AtualizarReciboVencimento(
          ${id},
          ${data_submissao_recibo_param ? `'${data_submissao_recibo_param}'` : 'NULL'},
          ${recibo_pdf_param ? `'${recibo_pdf_param}'` : 'NULL'},
          ${id_pessoa_param !== undefined ? id_pessoa_param : 'NULL'},
          ${confirmacao_submissao_recibo_param !== undefined ? confirmacao_submissao_recibo_param : 'NULL'},
          ${data_recibo_param ? `'${data_recibo_param}'` : 'NULL'}
        )
      `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Recibo de vencimento atualizado com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

async function criarRecibosParaTodasPessoas() {
    try {
        // Obtém todas as pessoas da tabela pessoas
        const pessoas = await sequelize.query('SELECT id_pessoa FROM pessoas', {
            type: Sequelize.QueryTypes.SELECT
        });

        // Itera sobre cada pessoa e chama o procedimento para inserir o recibo
        for (const pessoa of pessoas) {
            const { id_pessoa } = pessoa;

            // Chama o procedimento InserirReciboVencimento para cada pessoa
            await sequelize.query(`
                CALL InserirReciboVencimento(
                    NULL,
                    NULL,
                    ${id_pessoa},
                    false,
                    CURRENT_DATE
                )
            `);
        }

        console.log('Recibos criados para todas as pessoas com sucesso!');
    } catch (error) {
        console.error('Erro ao criar recibos:', error);
    }
}

cron.schedule('45 16 11 * *', () => {
    criarRecibosParaTodasPessoas();
}, {
    scheduled: true,
    timezone: 'Europe/Lisbon'
});

module.exports = recibosVencimentoController;