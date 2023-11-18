const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('parcerias', {
    id_parceria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_tipo_parceria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipo_parceria',
        key: 'id_tipo_parceria'
      }
    },
    nome_parceria: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    descricao_parceria: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    beneficios_parceria: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    imagem_parceria: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    parceria_publicada: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'parcerias',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "parcerias_pk",
        unique: true,
        fields: [
          { name: "id_parceria" },
        ]
      },
      {
        name: "pk_parcerias",
        unique: true,
        fields: [
          { name: "id_parceria" },
        ]
      },
    ]
  });
};
