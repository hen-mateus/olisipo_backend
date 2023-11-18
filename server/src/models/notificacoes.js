const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notificacoes', {
    id_notificacao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_pessoa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pessoas',
        key: 'id_pessoa'
      }
    },
    tipo_notificacao: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    notificacao_lida: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'notificacoes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "notificacoes_pk",
        unique: true,
        fields: [
          { name: "id_notificacao" },
        ]
      },
      {
        name: "pk_notificacoes",
        unique: true,
        fields: [
          { name: "id_notificacao" },
        ]
      },
      {
        name: "r__13_fk",
        fields: [
          { name: "id_pessoa" },
        ]
      },
    ]
  });
};
