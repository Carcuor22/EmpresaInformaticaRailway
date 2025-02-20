const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tareas', {
    id_tarea: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    titulo: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    id_proyecto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'proyecto',
        key: 'id_proyecto'
      }
    },
  }, {
    sequelize,
    tableName: 'tareas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_tarea" },
        ]
      },
      {
        name: "FK_PROYECTOS",
        using: "BTREE",
        fields: [
          { name: "id_proyecto" },
        ]
      },
    ]
  });
};
