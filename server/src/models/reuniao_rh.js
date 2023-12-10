const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reuniao_rh', {
    id_reuniao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    data_reuniao: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    motivo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    horas: {
      type: DataTypes.TIME,
      allowNull: false
    },
    confirmar_reuniao: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'reuniao_rh',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_reuniao_rh",
        unique: true,
        fields: [
          { name: "id_reuniao" },
        ]
      },
      {
        name: "reuniao_rh_pk",
        unique: true,
        fields: [
          { name: "id_reuniao" },
        ]
      },
    ]
  });
};
