const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('relacao_ferias_estado', {
    id_estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'estados',
        key: 'id_estado'
      }
    },
    id_ferias: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ferias',
        key: 'id_ferias'
      }
    },
    data_estado_ferias: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'relacao_ferias_estado',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_relacao_ferias_estado",
        unique: true,
        fields: [
          { name: "id_estado" },
          { name: "id_ferias" },
        ]
      },
      {
        name: "r_15_fk",
        fields: [
          { name: "id_estado" },
        ]
      },
      {
        name: "relacao_ferias_estado_pk",
        unique: true,
        fields: [
          { name: "id_estado" },
          { name: "id_ferias" },
        ]
      },
      {
        name: "relationship_23_fk",
        fields: [
          { name: "id_ferias" },
        ]
      },
    ]
  });
};
