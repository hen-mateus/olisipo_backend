const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ferias', {
    id_ferias: {
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
    data_comeco: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    data_fim: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    data_submissao: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    confirmacao_ferias: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ferias',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "ferias_pk",
        unique: true,
        fields: [
          { name: "id_ferias" },
        ]
      },
      {
        name: "pk_ferias",
        unique: true,
        fields: [
          { name: "id_ferias" },
        ]
      },
      {
        name: "r_5_fk",
        fields: [
          { name: "id_pessoa" },
        ]
      },
    ]
  });
};
