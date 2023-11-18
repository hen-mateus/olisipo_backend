const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('relacao_pessoas_reuniao', {
    id_reuniao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'reuniao_rh',
        key: 'id_reuniao'
      }
    },
    id_pessoa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'pessoas',
        key: 'id_pessoa'
      }
    }
  }, {
    sequelize,
    tableName: 'relacao_pessoas_reuniao',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_relacao_pessoas_reuniao",
        unique: true,
        fields: [
          { name: "id_reuniao" },
          { name: "id_pessoa" },
        ]
      },
      {
        name: "r_6_fk",
        fields: [
          { name: "id_reuniao" },
        ]
      },
      {
        name: "relacao_pessoas_reuniao_pk",
        unique: true,
        fields: [
          { name: "id_reuniao" },
          { name: "id_pessoa" },
        ]
      },
      {
        name: "relationship_21_fk",
        fields: [
          { name: "id_pessoa" },
        ]
      },
    ]
  });
};
