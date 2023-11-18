const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipo_de_pessoas', {
    id_tipo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tipo: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tipo_de_pessoas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_tipo_de_pessoas",
        unique: true,
        fields: [
          { name: "id_tipo" },
        ]
      },
      {
        name: "tipo_de_pessoas_pk",
        unique: true,
        fields: [
          { name: "id_tipo" },
        ]
      },
    ]
  });
};
