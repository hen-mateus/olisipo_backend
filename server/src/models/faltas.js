const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('faltas', {
    id_falta: {
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
    data_falta: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    horas_faltadas: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    justificacao: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    confirmacao_faltas: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'faltas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "faltas_pk",
        unique: true,
        fields: [
          { name: "id_falta" },
        ]
      },
      {
        name: "pk_faltas",
        unique: true,
        fields: [
          { name: "id_falta" },
        ]
      },
      {
        name: "r_8_fk",
        fields: [
          { name: "id_pessoa" },
        ]
      },
    ]
  });
};
