const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('estados', {
    id_estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tipo_estado: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'estados',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "estados_pk",
        unique: true,
        fields: [
          { name: "id_estado" },
        ]
      },
      {
        name: "pk_estados",
        unique: true,
        fields: [
          { name: "id_estado" },
        ]
      },
    ]
  });
};
