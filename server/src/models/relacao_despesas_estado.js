const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('relacao_despesas_estado', {
    id_estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'estados',
        key: 'id_estado'
      }
    },
    id_despesa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'despesas_viatura_propria',
        key: 'id_despesa'
      }
    },
    data_estado_despesas: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'relacao_despesas_estado',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_relacao_despesas_estado",
        unique: true,
        fields: [
          { name: "id_estado" },
          { name: "id_despesa" },
        ]
      },
      {
        name: "r_16_fk",
        fields: [
          { name: "id_estado" },
        ]
      },
      {
        name: "relacao_despesas_estado_pk",
        unique: true,
        fields: [
          { name: "id_estado" },
          { name: "id_despesa" },
        ]
      },
      {
        name: "relationship_24_fk",
        fields: [
          { name: "id_despesa" },
        ]
      },
    ]
  });
};
