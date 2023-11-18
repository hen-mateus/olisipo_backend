const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pessoas', {
    id_pessoa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    pes_id_pessoa: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pessoas',
        key: 'id_pessoa'
      }
    },
    id_tipo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipo_de_pessoas',
        key: 'id_tipo'
      }
    },
    nome_pessoa: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cliente: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ativa: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    curriculo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    numero_colaborador: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    contribuinte: {
      type: DataTypes.STRING(9),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pessoas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pessoas_pk",
        unique: true,
        fields: [
          { name: "id_pessoa" },
        ]
      },
      {
        name: "pk_pessoas",
        unique: true,
        fields: [
          { name: "id_pessoa" },
        ]
      },
      {
        name: "r_10_fk",
        fields: [
          { name: "pes_id_pessoa" },
        ]
      },
    ]
  });
};
