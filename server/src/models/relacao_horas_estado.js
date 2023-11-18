const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('relacao_horas_estado', {
    id_estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'estados',
        key: 'id_estado'
      }
    },
    id_relatorio_horas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'relatorio_horas',
        key: 'id_relatorio_horas'
      }
    },
    data_estado_relatorio_horas: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'relacao_horas_estado',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_relacao_horas_estado",
        unique: true,
        fields: [
          { name: "id_estado" },
          { name: "id_relatorio_horas" },
        ]
      },
      {
        name: "r_17_fk",
        fields: [
          { name: "id_estado" },
        ]
      },
      {
        name: "relacao_horas_estado_pk",
        unique: true,
        fields: [
          { name: "id_estado" },
          { name: "id_relatorio_horas" },
        ]
      },
      {
        name: "relationship_25_fk",
        fields: [
          { name: "id_relatorio_horas" },
        ]
      },
    ]
  });
};
