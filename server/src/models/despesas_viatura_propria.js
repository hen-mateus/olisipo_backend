const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('despesas_viatura_propria', {
    id_despesa: {
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
    quilometros: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    data_deslocacao: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    ponto_de_origem: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ponto_de_chegada: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    confirmacao_despesas: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'despesas_viatura_propria',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "despesas_viatura_propria_pk",
        unique: true,
        fields: [
          { name: "id_despesa" },
        ]
      },
      {
        name: "pk_despesas_viatura_propria",
        unique: true,
        fields: [
          { name: "id_despesa" },
        ]
      },
      {
        name: "r_7_fk",
        fields: [
          { name: "id_pessoa" },
        ]
      },
    ]
  });
};
