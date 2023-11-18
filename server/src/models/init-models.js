var DataTypes = require("sequelize").DataTypes;
var _ajudas_custo = require("./ajudas_custo");
var _conteudos_website = require("./conteudos_website");
var _despesas_viatura_propria = require("./despesas_viatura_propria");
var _estados = require("./estados");
var _faltas = require("./faltas");
var _ferias = require("./ferias");
var _informacoes_profissionais = require("./informacoes_profissionais");
var _logs = require("./logs");
var _noticias = require("./noticias");
var _notificacoes = require("./notificacoes");
var _parcerias = require("./parcerias");
var _pessoas = require("./pessoas");
var _pessoas_auxiliar = require("./pessoas_auxiliar");
var _recibos_vencimento = require("./recibos_vencimento");
var _relacao_ajudas_estado = require("./relacao_ajudas_estado");
var _relacao_despesas_estado = require("./relacao_despesas_estado");
var _relacao_faltas_estado = require("./relacao_faltas_estado");
var _relacao_ferias_estado = require("./relacao_ferias_estado");
var _relacao_horas_estado = require("./relacao_horas_estado");
var _relacao_pessoas_reuniao = require("./relacao_pessoas_reuniao");
var _relatorio_horas = require("./relatorio_horas");
var _reuniao_rh = require("./reuniao_rh");
var _tipo_de_pessoas = require("./tipo_de_pessoas");
var _tipo_noticia = require("./tipo_noticia");
var _tipo_parceria = require("./tipo_parceria");

function initModels(sequelize) {
  var ajudas_custo = _ajudas_custo(sequelize, DataTypes);
  var conteudos_website = _conteudos_website(sequelize, DataTypes);
  var despesas_viatura_propria = _despesas_viatura_propria(sequelize, DataTypes);
  var estados = _estados(sequelize, DataTypes);
  var faltas = _faltas(sequelize, DataTypes);
  var ferias = _ferias(sequelize, DataTypes);
  var informacoes_profissionais = _informacoes_profissionais(sequelize, DataTypes);
  var logs = _logs(sequelize, DataTypes);
  var noticias = _noticias(sequelize, DataTypes);
  var notificacoes = _notificacoes(sequelize, DataTypes);
  var parcerias = _parcerias(sequelize, DataTypes);
  var pessoas = _pessoas(sequelize, DataTypes);
  var pessoas_auxiliar = _pessoas_auxiliar(sequelize, DataTypes);
  var recibos_vencimento = _recibos_vencimento(sequelize, DataTypes);
  var relacao_ajudas_estado = _relacao_ajudas_estado(sequelize, DataTypes);
  var relacao_despesas_estado = _relacao_despesas_estado(sequelize, DataTypes);
  var relacao_faltas_estado = _relacao_faltas_estado(sequelize, DataTypes);
  var relacao_ferias_estado = _relacao_ferias_estado(sequelize, DataTypes);
  var relacao_horas_estado = _relacao_horas_estado(sequelize, DataTypes);
  var relacao_pessoas_reuniao = _relacao_pessoas_reuniao(sequelize, DataTypes);
  var relatorio_horas = _relatorio_horas(sequelize, DataTypes);
  var reuniao_rh = _reuniao_rh(sequelize, DataTypes);
  var tipo_de_pessoas = _tipo_de_pessoas(sequelize, DataTypes);
  var tipo_noticia = _tipo_noticia(sequelize, DataTypes);
  var tipo_parceria = _tipo_parceria(sequelize, DataTypes);

  ajudas_custo.belongsToMany(estados, { as: 'id_estado_estados', through: relacao_ajudas_estado, foreignKey: "id_ajuda_custo", otherKey: "id_estado" });
  despesas_viatura_propria.belongsToMany(estados, { as: 'id_estado_estados_relacao_despesas_estados', through: relacao_despesas_estado, foreignKey: "id_despesa", otherKey: "id_estado" });
  estados.belongsToMany(ajudas_custo, { as: 'id_ajuda_custo_ajudas_custos', through: relacao_ajudas_estado, foreignKey: "id_estado", otherKey: "id_ajuda_custo" });
  estados.belongsToMany(despesas_viatura_propria, { as: 'id_despesa_despesas_viatura_propria', through: relacao_despesas_estado, foreignKey: "id_estado", otherKey: "id_despesa" });
  estados.belongsToMany(faltas, { as: 'id_falta_falta', through: relacao_faltas_estado, foreignKey: "id_estado", otherKey: "id_falta" });
  estados.belongsToMany(ferias, { as: 'id_ferias_feria', through: relacao_ferias_estado, foreignKey: "id_estado", otherKey: "id_ferias" });
  estados.belongsToMany(relatorio_horas, { as: 'id_relatorio_horas_relatorio_horas', through: relacao_horas_estado, foreignKey: "id_estado", otherKey: "id_relatorio_horas" });
  faltas.belongsToMany(estados, { as: 'id_estado_estados_relacao_faltas_estados', through: relacao_faltas_estado, foreignKey: "id_falta", otherKey: "id_estado" });
  ferias.belongsToMany(estados, { as: 'id_estado_estados_relacao_ferias_estados', through: relacao_ferias_estado, foreignKey: "id_ferias", otherKey: "id_estado" });
  pessoas.belongsToMany(reuniao_rh, { as: 'id_reuniao_reuniao_rhs', through: relacao_pessoas_reuniao, foreignKey: "id_pessoa", otherKey: "id_reuniao" });
  relatorio_horas.belongsToMany(estados, { as: 'id_estado_estados_relacao_horas_estados', through: relacao_horas_estado, foreignKey: "id_relatorio_horas", otherKey: "id_estado" });
  reuniao_rh.belongsToMany(pessoas, { as: 'id_pessoa_pessoas', through: relacao_pessoas_reuniao, foreignKey: "id_reuniao", otherKey: "id_pessoa" });
  relacao_ajudas_estado.belongsTo(ajudas_custo, { as: "id_ajuda_custo_ajudas_custo", foreignKey: "id_ajuda_custo"});
  ajudas_custo.hasMany(relacao_ajudas_estado, { as: "relacao_ajudas_estados", foreignKey: "id_ajuda_custo"});
  relacao_despesas_estado.belongsTo(despesas_viatura_propria, { as: "id_despesa_despesas_viatura_proprium", foreignKey: "id_despesa"});
  despesas_viatura_propria.hasMany(relacao_despesas_estado, { as: "relacao_despesas_estados", foreignKey: "id_despesa"});
  relacao_ajudas_estado.belongsTo(estados, { as: "id_estado_estado", foreignKey: "id_estado"});
  estados.hasMany(relacao_ajudas_estado, { as: "relacao_ajudas_estados", foreignKey: "id_estado"});
  relacao_despesas_estado.belongsTo(estados, { as: "id_estado_estado", foreignKey: "id_estado"});
  estados.hasMany(relacao_despesas_estado, { as: "relacao_despesas_estados", foreignKey: "id_estado"});
  relacao_faltas_estado.belongsTo(estados, { as: "id_estado_estado", foreignKey: "id_estado"});
  estados.hasMany(relacao_faltas_estado, { as: "relacao_faltas_estados", foreignKey: "id_estado"});
  relacao_ferias_estado.belongsTo(estados, { as: "id_estado_estado", foreignKey: "id_estado"});
  estados.hasMany(relacao_ferias_estado, { as: "relacao_ferias_estados", foreignKey: "id_estado"});
  relacao_horas_estado.belongsTo(estados, { as: "id_estado_estado", foreignKey: "id_estado"});
  estados.hasMany(relacao_horas_estado, { as: "relacao_horas_estados", foreignKey: "id_estado"});
  relacao_faltas_estado.belongsTo(faltas, { as: "id_falta_falta", foreignKey: "id_falta"});
  faltas.hasMany(relacao_faltas_estado, { as: "relacao_faltas_estados", foreignKey: "id_falta"});
  relacao_ferias_estado.belongsTo(ferias, { as: "id_ferias_feria", foreignKey: "id_ferias"});
  ferias.hasMany(relacao_ferias_estado, { as: "relacao_ferias_estados", foreignKey: "id_ferias"});
  ajudas_custo.belongsTo(pessoas, { as: "id_pessoa_pessoa", foreignKey: "id_pessoa"});
  pessoas.hasMany(ajudas_custo, { as: "ajudas_custos", foreignKey: "id_pessoa"});
  conteudos_website.belongsTo(pessoas, { as: "id_pessoa_pessoa", foreignKey: "id_pessoa"});
  pessoas.hasMany(conteudos_website, { as: "conteudos_websites", foreignKey: "id_pessoa"});
  despesas_viatura_propria.belongsTo(pessoas, { as: "id_pessoa_pessoa", foreignKey: "id_pessoa"});
  pessoas.hasMany(despesas_viatura_propria, { as: "despesas_viatura_propria", foreignKey: "id_pessoa"});
  faltas.belongsTo(pessoas, { as: "id_pessoa_pessoa", foreignKey: "id_pessoa"});
  pessoas.hasMany(faltas, { as: "falta", foreignKey: "id_pessoa"});
  ferias.belongsTo(pessoas, { as: "id_pessoa_pessoa", foreignKey: "id_pessoa"});
  pessoas.hasMany(ferias, { as: "feria", foreignKey: "id_pessoa"});
  informacoes_profissionais.belongsTo(pessoas, { as: "id_pessoa_pessoa", foreignKey: "id_pessoa"});
  pessoas.hasMany(informacoes_profissionais, { as: "informacoes_profissionais", foreignKey: "id_pessoa"});
  notificacoes.belongsTo(pessoas, { as: "id_pessoa_pessoa", foreignKey: "id_pessoa"});
  pessoas.hasMany(notificacoes, { as: "notificacos", foreignKey: "id_pessoa"});
  pessoas.belongsTo(pessoas, { as: "pes_id_pessoa_pessoa", foreignKey: "pes_id_pessoa"});
  pessoas.hasMany(pessoas, { as: "pessoas", foreignKey: "pes_id_pessoa"});
  pessoas_auxiliar.belongsTo(pessoas, { as: "id_pessoa_pessoa", foreignKey: "id_pessoa"});
  pessoas.hasMany(pessoas_auxiliar, { as: "pessoas_auxiliars", foreignKey: "id_pessoa"});
  recibos_vencimento.belongsTo(pessoas, { as: "id_pessoa_pessoa", foreignKey: "id_pessoa"});
  pessoas.hasMany(recibos_vencimento, { as: "recibos_vencimentos", foreignKey: "id_pessoa"});
  relacao_pessoas_reuniao.belongsTo(pessoas, { as: "id_pessoa_pessoa", foreignKey: "id_pessoa"});
  pessoas.hasMany(relacao_pessoas_reuniao, { as: "relacao_pessoas_reuniaos", foreignKey: "id_pessoa"});
  relatorio_horas.belongsTo(pessoas, { as: "id_pessoa_pessoa", foreignKey: "id_pessoa"});
  pessoas.hasMany(relatorio_horas, { as: "relatorio_horas", foreignKey: "id_pessoa"});
  relacao_horas_estado.belongsTo(relatorio_horas, { as: "id_relatorio_horas_relatorio_hora", foreignKey: "id_relatorio_horas"});
  relatorio_horas.hasMany(relacao_horas_estado, { as: "relacao_horas_estados", foreignKey: "id_relatorio_horas"});
  relacao_pessoas_reuniao.belongsTo(reuniao_rh, { as: "id_reuniao_reuniao_rh", foreignKey: "id_reuniao"});
  reuniao_rh.hasMany(relacao_pessoas_reuniao, { as: "relacao_pessoas_reuniaos", foreignKey: "id_reuniao"});
  pessoas.belongsTo(tipo_de_pessoas, { as: "id_tipo_tipo_de_pessoa", foreignKey: "id_tipo"});
  tipo_de_pessoas.hasMany(pessoas, { as: "pessoas", foreignKey: "id_tipo"});
  noticias.belongsTo(tipo_noticia, { as: "id_tipo_noticia_tipo_noticium", foreignKey: "id_tipo_noticia"});
  tipo_noticia.hasMany(noticias, { as: "noticia", foreignKey: "id_tipo_noticia"});
  parcerias.belongsTo(tipo_parceria, { as: "id_tipo_parceria_tipo_parcerium", foreignKey: "id_tipo_parceria"});
  tipo_parceria.hasMany(parcerias, { as: "parceria", foreignKey: "id_tipo_parceria"});

  return {
    ajudas_custo,
    conteudos_website,
    despesas_viatura_propria,
    estados,
    faltas,
    ferias,
    informacoes_profissionais,
    logs,
    noticias,
    notificacoes,
    parcerias,
    pessoas,
    pessoas_auxiliar,
    recibos_vencimento,
    relacao_ajudas_estado,
    relacao_despesas_estado,
    relacao_faltas_estado,
    relacao_ferias_estado,
    relacao_horas_estado,
    relacao_pessoas_reuniao,
    relatorio_horas,
    reuniao_rh,
    tipo_de_pessoas,
    tipo_noticia,
    tipo_parceria,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
