const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('noticias', {
    id_noticia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_tipo_noticia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipo_noticia',
        key: 'id_tipo_noticia'
      }
    },
    titulo_noticia: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    subtitulo_noticia: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    corpo_noticia: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    imagem_noticia: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    noticia_publicada: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'noticias',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "noticias_pk",
        unique: true,
        fields: [
          { name: "id_noticia" },
        ]
      },
      {
        name: "pk_noticias",
        unique: true,
        fields: [
          { name: "id_noticia" },
        ]
      },
    ]
  });
};
