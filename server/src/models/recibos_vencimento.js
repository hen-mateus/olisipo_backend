const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('recibos_vencimento', {
    data_submissao_recibo: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    recibo_pdf: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    id_recibo: {
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
    confirmacao_submissao_recibo: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    data_recibo: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'recibos_vencimento',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_recibos_vencimento",
        unique: true,
        fields: [
          { name: "id_recibo" },
        ]
      },
      {
        name: "recibos_vencimento_pk",
        unique: true,
        fields: [
          { name: "id_recibo" },
        ]
      },
      {
        name: "relationship_27_fk",
        fields: [
          { name: "id_pessoa" },
        ]
      },
    ]
  });
};
