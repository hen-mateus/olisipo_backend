const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('logs', {
    id_log: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    acao: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    nome_pessoa2: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'logs',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "logs_pk",
        unique: true,
        fields: [
          { name: "id_log" },
        ]
      },
      {
        name: "pk_logs",
        unique: true,
        fields: [
          { name: "id_log" },
        ]
      },
    ]
  });
};
