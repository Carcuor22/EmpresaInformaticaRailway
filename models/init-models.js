var DataTypes = require("sequelize").DataTypes;
var _tareas = require("./tareas");
var _proyectos = require("./proyectos");
var _users = require("./users");

function initModels(sequelize) {
  var tareas = _tareas(sequelize, DataTypes);
  var proyectos = _proyectos(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  // Relación: Tarea pertenece a Proyecto (una tarea solo puede estar asociada a un proyecto)
  tareas.belongsTo(proyectos, { as: "proyecto", foreignKey: "id_proyecto" }); // Alias claro

  // Relación: Proyecto tiene muchas tareas
  proyectos.hasMany(tareas, { as: "tareas", foreignKey: "id_proyecto" }); // Alias claro

  return {
    tareas,
    proyectos,
    users,
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
