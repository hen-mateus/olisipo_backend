const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pessoas_auxiliar', {
    id_pessoas_auxiliar: {
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
    nome_pessoa_auxiliar: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    email_auxiliar: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'pessoas_auxiliar',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pessoas_auxiliar_pk",
        unique: true,
        fields: [
          { name: "id_pessoas_auxiliar" },
        ]
      },
      {
        name: "pk_pessoas_auxiliar",
        unique: true,
        fields: [
          { name: "id_pessoas_auxiliar" },
        ]
      },
      {
        name: "r_20_fk",
        fields: [
          { name: "id_pessoa" },
        ]
      },
    ]
  });
};
