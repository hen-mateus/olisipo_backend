const Sequelize = require('sequelize');
const sequelize = require('../models/database');
const Pessoas = require('../models/pessoas');

const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("../jwt");

const pessoasController = {};

pessoasController.register = async (req, res) => {
    const { pes_id_param,
        id_tipo_param,
        nome_pessoa_param,
        email_param,
        password_param,
        cliente_param,
        ativa_param,
        deleted_param,
        curriculo_param,
        numero_colaborador_param,
        contribuinte_param } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password_param, 10);

        const query = `
            CALL InserirPessoa(
                ${pes_id_param},
                ${id_tipo_param},
                '${nome_pessoa_param}',
                '${email_param}',
                '${hashedPassword}',
                '${cliente_param}',
                ${ativa_param},
                ${deleted_param},
                '${curriculo_param}',
                ${numero_colaborador_param},
                '${contribuinte_param}'
            )
        `;

        await sequelize.query(query);

        sendWelcomeEmail(email_param, nome_pessoa_param, password_param);
        res.json({ success: true, message: 'Usuário registrado com sucesso' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Função para enviar e-mail de boas-vindas com informações de e-mail e senha
const sendWelcomeEmail = (email, nome, senha) => {
    const transporter = nodemailer.createTransport({
        // Configurações do seu serviço de e-mail (ex: Gmail, Outlook, etc.)
        host: 'smtp.office365.com',  // Servidor SMTP do Outlook
        port: 587,  // Porta SMTP padrão
        secure: false,  // Define se a conexão deve usar SSL/TLS (no caso do Outlook, deixe como false)
        auth: {
            user: 'olisipoteste@outlook.pt',
            pass: 'Testeolisipo',
        },
    });

    const mailOptions = {
        from: 'olisipoteste@outlook.pt',
        to: email,
        subject: 'Bem-vindo ao portal do colaborador Olisipo',
        text: `Olá ${nome},\n\nBem-vindo à nossa aplicação! Aqui estão os seus dados de login.\n\nSeu endereço de e-mail: ${email}\nSua senha: ${senha}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });
};
const enviarCodMail = (email, code) => {
    const transporter = nodemailer.createTransport({
        // Configurações do seu serviço de e-mail (ex: Gmail, Outlook, etc.)
        host: 'smtp.office365.com',  // Servidor SMTP do Outlook
        port: 587,  // Porta SMTP padrão
        secure: false,  // Define se a conexão deve usar SSL/TLS (no caso do Outlook, deixe como false)
        auth: {
            user: 'olisipoteste@outlook.pt',
            pass: 'Testeolisipo',
        },
    });

    const mailOptions = {
        from: 'olisipoteste@outlook.pt',
        to: email,
        subject: 'Olisipo Portal - Codigo de Confirmação',
        text: `Olá,\n\nRecebemos um pedido para redefinir a sua senha no Olisipo Portal.\n\nPara proceder com a redefinição, insira o código de confirmação abaixo no campo predestinado:\n\n${code}\n\nSe não solicitou a redefinição de senha, por favor, ignore este e-mail.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });
};

pessoasController.login = async (req, res) => {
    const { email_param, pass_param } = req.body;

    try {
        const query = `
            SELECT id_pessoa, email, password FROM pessoas WHERE email = '${email_param}'
        `;

        const [users, metadata] = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

        console.log("Users:", users);

        if (!users || users.length === 0) {
            return res.status(400).json({ error: "User Doesn't Exist" });
        }

        const dbPassword = users.password;

        bcrypt.compare(pass_param, dbPassword).then((match) => {
            if (!match) {
                res.status(400).json({ error: "Wrong Username and Password Combination!" });
            } else {
                const accessToken = createTokens(users);

                res.cookie("access-token", accessToken, {
                    maxAge: 60 * 60 * 24 * 30 * 1000,
                    httpOnly: true,
                });

                console.log(accessToken)
                res.json({ success: true, message: 'Login bem-sucedido', token: accessToken })
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

pessoasController.list = async (req, res) => {
    try {
        const query = 'SELECT * FROM pessoas;';
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        res.json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


pessoasController.listManagers = async (req, res) => {
    try {
        const query = `
        SELECT pessoas.*
        FROM pessoas
        JOIN tipo_de_pessoas ON pessoas.id_tipo = tipo_de_pessoas.id_tipo
        WHERE tipo_de_pessoas.tipo = 'Manager';
    `;
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        res.json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


pessoasController.getId = async (req, res) => {
    const id_pessoa_param = req.userId;

    try {
        const query = `SELECT pessoas.*, tipo_de_pessoas.tipo FROM pessoas JOIN tipo_de_pessoas ON pessoas.id_tipo=tipo_de_pessoas.id_tipo WHERE id_pessoa = ${id_pessoa_param}`;
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        if (data.length > 0) {
            res.json({ success: true, data: data });
        } else {
            res.status(404).json({ success: false, message: 'Pessoa não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

pessoasController.create = async (req, res) => {
    const {
        pes_id_param,
        id_tipo_param,
        nome_pessoa_param,
        email_param,
        password_param,
        cliente_param,
        ativa_param,
        deleted_param,
        curriculo_param,
        numero_colaborador_param,
        contribuinte_param
    } = req.body;

    try {
        const query = `
        CALL InserirPessoa(
          ${pes_id_param},
          ${id_tipo_param},
          '${nome_pessoa_param}',
          '${email_param}',
          '${password_param}',
          '${cliente_param}',
          ${ativa_param},
          ${deleted_param},
          '${curriculo_param}',
          ${numero_colaborador_param},
          '${contribuinte_param}'
        )
      `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Pessoa criada com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

pessoasController.update = async (req, res) => {
    const id_pessoa_param = req.userId;

    const {
        nome_pessoa_param,
        pass_pessoa_param,
        email_param,
        ativa_param,
        deleted_param,
        curriculo_param,
        cliente_param
    } = req.body;

    try {
        let hashedPassword = pass_pessoa_param;

        if (pass_pessoa_param) {
            hashedPassword = await bcrypt.hash(pass_pessoa_param, 10);
        }

        const query = `
        CALL AtualizarPessoa(
          ${id_pessoa_param},
          ${nome_pessoa_param ? `'${nome_pessoa_param}'` : 'NULL'},
          '${hashedPassword}',
          ${email_param ? `'${email_param}'` : 'NULL'},
          ${ativa_param !== undefined ? ativa_param : 'NULL'},
          ${deleted_param !== undefined ? deleted_param : 'NULL'},
          ${curriculo_param ? `'${curriculo_param}'` : 'NULL'},
          ${cliente_param ? `'${cliente_param}'` : 'NULL'}
        )
      `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Pessoa atualizada com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


pessoasController.updateDados = async (req, res) => {
    const { id } = req.params;

    const {
        nome_pessoa_param,
        pass_pessoa_param,
        email_param,
        ativa_param,
        deleted_param,
        curriculo_param,
        cliente_param
    } = req.body;

    try {
        const query = `
        CALL AtualizarPessoa(
          ${id},
          ${nome_pessoa_param ? `'${nome_pessoa_param}'` : 'NULL'},
          ${pass_pessoa_param ? `'${pass_pessoa_param}'` : 'NULL'},
          ${email_param ? `'${email_param}'` : 'NULL'},
          ${ativa_param !== undefined ? ativa_param : 'NULL'},
          ${deleted_param !== undefined ? deleted_param : 'NULL'},
          ${curriculo_param ? `'${curriculo_param}'` : 'NULL'},
          ${cliente_param ? `'${cliente_param}'` : 'NULL'}
        )
      `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Pessoa atualizada com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

pessoasController.updatePorEmail = async (req, res) => {
    const {
        pass_pessoa_param,
        email_param
    } = req.body;

    try {
        let hashedPassword = pass_pessoa_param;

        if (pass_pessoa_param) {
            hashedPassword = await bcrypt.hash(pass_pessoa_param, 10);
        }

        const query = `
            UPDATE pessoas SET password='${hashedPassword}' WHERE email='${email_param}';
        `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Pessoa atualizada com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


pessoasController.enviarMail = async (req, res) => {
    const {
        email_param,
        code
    } = req.body;

    enviarCodMail(email_param, code);
};




module.exports = pessoasController;
