const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipo_parceria', {
    id_tipo_parceria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tipo_parceria: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tipo_parceria',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_tipo_parceria",
        unique: true,
        fields: [
          { name: "id_tipo_parceria" },
        ]
      },
      {
        name: "tipo_parceria_pk",
        unique: true,
        fields: [
          { name: "id_tipo_parceria" },
        ]
      },
    ]
  });
};
