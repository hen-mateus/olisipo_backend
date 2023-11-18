const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('relacao_ajudas_estado', {
    id_estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'estados',
        key: 'id_estado'
      }
    },
    id_ajuda_custo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ajudas_custo',
        key: 'id_ajuda_custo'
      }
    },
    data_estado_ajudascusto: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'relacao_ajudas_estado',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_relacao_ajudas_estado",
        unique: true,
        fields: [
          { name: "id_estado" },
          { name: "id_ajuda_custo" },
        ]
      },
      {
        name: "r_14_fk",
        fields: [
          { name: "id_estado" },
        ]
      },
      {
        name: "relacao_ajudas_estado_pk",
        unique: true,
        fields: [
          { name: "id_estado" },
          { name: "id_ajuda_custo" },
        ]
      },
      {
        name: "relationship_22_fk",
        fields: [
          { name: "id_ajuda_custo" },
        ]
      },
    ]
  });
};
