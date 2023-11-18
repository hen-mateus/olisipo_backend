const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('informacoes_profissionais', {
    id_informacao: {
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
    titulo_informacao: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    descricao_informacao: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    documento_comprovativo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tipo_informacao: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'informacoes_profissionais',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "informacoes_profissionais_pk",
        unique: true,
        fields: [
          { name: "id_informacao" },
        ]
      },
      {
        name: "pk_informacoes_profissionais",
        unique: true,
        fields: [
          { name: "id_informacao" },
        ]
      },
      {
        name: "r_18_fk",
        fields: [
          { name: "id_pessoa" },
        ]
      },
    ]
  });
};
