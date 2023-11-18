const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('relacao_faltas_estado', {
    id_estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'estados',
        key: 'id_estado'
      }
    },
    id_falta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'faltas',
        key: 'id_falta'
      }
    },
    data_estado_falta: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'relacao_faltas_estado',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_relacao_faltas_estado",
        unique: true,
        fields: [
          { name: "id_estado" },
          { name: "id_falta" },
        ]
      },
      {
        name: "r_19_fk",
        fields: [
          { name: "id_estado" },
        ]
      },
      {
        name: "relacao_faltas_estado_pk",
        unique: true,
        fields: [
          { name: "id_estado" },
          { name: "id_falta" },
        ]
      },
      {
        name: "relationship_26_fk",
        fields: [
          { name: "id_falta" },
        ]
      },
    ]
  });
};
