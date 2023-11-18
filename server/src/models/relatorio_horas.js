const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('relatorio_horas', {
    id_relatorio_horas: {
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
    data_relatorio_horas: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    mes: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    horas_efetuadas: {
      type: DataTypes.TIME,
      allowNull: false
    },
    confirmacao_relatorio_horas: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    ano_relatorio_horas: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'relatorio_horas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_relatorio_horas",
        unique: true,
        fields: [
          { name: "id_relatorio_horas" },
        ]
      },
      {
        name: "r_9_fk",
        fields: [
          { name: "id_pessoa" },
        ]
      },
      {
        name: "relatorio_horas_pk",
        unique: true,
        fields: [
          { name: "id_relatorio_horas" },
        ]
      },
    ]
  });
};
