const express = require('express');
const cors = require('cors');
const app = express();

const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("./jwt");

const PORT = process.env.PORT || 3000;

const ajudasCustoRoute = require('./routes/ajudasCustoRoute');
const conteudosWebsiteRoute = require('./routes/conteudosWebsiteRoute');
const despesasPropriaRoute = require('./routes/despesasPropriaRoute');
const estadosRoute = require('./routes/estadosRoute');
const faltasRoute = require('./routes/faltasRoute');
const feriasRoute = require('./routes/feriasRoute');
const horasRoute = require('./routes/horasRoute');
const informacoesProfissionaisRoute = require('./routes/informacoesProfissionaisRoute');
const noticiasRoute = require('./routes/noticiasRoute');
const notificacoesRoute = require('./routes/notificacoesRoute');
const parceriasRoute = require('./routes/parceriasRoute');
const pessoasAuxiliarRoute = require('./routes/pessoasAuxiliarRoute');
const pessoasRoute = require('./routes/pessoasRoute');
const recibosVencimentoRoute = require('./routes/recibosVencimentoRoute');
const reuniaoRHRoute = require('./routes/reuniaoRHRoute');
const tipoNoticiaRoute = require('./routes/tipoNoticiaRoute');
const tipoParceriaRoute = require('./routes/tipoParceriaRoute');
const tipoPessoaRoute = require('./routes/tipoPessoaRoute');
const relacaoEstadosRoute = require('./routes/relacaoEstadosRoute');

// Configurar CORS
app.use(cors());

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Rota básica de exemplo
app.get('/', (req, res) => {
  res.send('Bem-vindo à minha API!');
});

app.use('/ajudascusto', ajudasCustoRoute);
app.use('/conteudowebsite', conteudosWebsiteRoute);
app.use('/despesasviatura', despesasPropriaRoute);
app.use('/estados', estadosRoute);
app.use('/faltas', faltasRoute);
app.use('/ferias', feriasRoute);
app.use('/horas', horasRoute);
app.use('/informacoesprof', informacoesProfissionaisRoute);
app.use('/noticias', noticiasRoute);
app.use('/notificacoes', notificacoesRoute);
app.use('/parcerias', parceriasRoute);
app.use('/pessoasauxiliar', pessoasAuxiliarRoute);
app.use('/pessoas', pessoasRoute);
app.use('/recibosvenc', recibosVencimentoRoute);
app.use('/reuniao', reuniaoRHRoute);
app.use('/tiponoticia', tipoNoticiaRoute);
app.use('/tipoparceria', tipoParceriaRoute);
app.use('/roles', tipoPessoaRoute);
app.use('/relacaoestados', relacaoEstadosRoute);

app.get("/profile", validateToken, (req, res) => {
  res.json("profile");
});


// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor na porta ${PORT}`);
});