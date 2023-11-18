const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('conteudos_website', {
    id_conteudo: {
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
    titulo_header: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imagem_header: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    texto1: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    texto2: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    texto3: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    link1: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    texto_footer: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    link2: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    titulo_footer: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    titulo_seccao: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imagem_seccao: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'conteudos_website',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "conteudos_website_pk",
        unique: true,
        fields: [
          { name: "id_conteudo" },
        ]
      },
      {
        name: "pk_conteudos_website",
        unique: true,
        fields: [
          { name: "id_conteudo" },
        ]
      },
      {
        name: "relationship_21_fk2",
        fields: [
          { name: "id_pessoa" },
        ]
      },
    ]
  });
};
