const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ajudas_custo', {
    id_ajuda_custo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_pessoa: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pessoas',
        key: 'id_pessoa'
      }
    },
    valor_ajuda: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    descritivo_ajuda: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fatura_ajuda: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    confirmacao_despesas: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ajudas_custo',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "ajudas_custo_pk",
        unique: true,
        fields: [
          { name: "id_ajuda_custo" },
        ]
      },
      {
        name: "pk_ajudas_custo",
        unique: true,
        fields: [
          { name: "id_ajuda_custo" },
        ]
      },
      {
        name: "r_4_fk",
        fields: [
          { name: "id_pessoa" },
        ]
      },
    ]
  });
};
