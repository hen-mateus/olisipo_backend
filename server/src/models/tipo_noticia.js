const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipo_noticia', {
    id_tipo_noticia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tipo_noticia: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tipo_noticia',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_tipo_noticia",
        unique: true,
        fields: [
          { name: "id_tipo_noticia" },
        ]
      },
      {
        name: "tipo_noticia_pk",
        unique: true,
        fields: [
          { name: "id_tipo_noticia" },
        ]
      },
    ]
  });
};
