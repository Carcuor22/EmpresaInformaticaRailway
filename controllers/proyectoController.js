// Importar libreria para respuestas
const Respuesta = require("../utils/respuesta");
const { logMensaje } = require("../utils/logger.js");
// Recuperar función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");
const { Op } = require("sequelize"); 

// Cargar las definiciones del modelo en sequelize
const models = initModels(sequelize);
// Recuperar el modelo plato
const Proyecto = models.proyectos;

class ProyectoController {

  async getProyectosFiltrados(req, res) {
    const { nombre, fecha_inicio, fecha_fin } = req.query;
    let whereClause = {};

    if (nombre) {
      whereClause.nombre = nombre; // Búsqueda exacta por nombre
    }

    
    if (fecha_inicio && fecha_fin) {
      whereClause.fecha_inicio = { [Op.gte]: fecha_inicio }; // Mayor o igual a fecha_inicio
      whereClause.fecha_fin = { [Op.lte]: fecha_fin }; // Menor o igual a fecha_fin
    }

    try {
      const proyectos = await Proyecto.findAll({ where: whereClause });

      if (proyectos.length > 0) {
        res.json(Respuesta.exito(proyectos, "Proyectos filtrados correctamente"));
      } else {
        res.status(404).json(Respuesta.error(null, "No se encontraron proyectos con esos filtros"));
      }
    } catch (err) {
      console.error("Error al recuperar proyectos:", err);
      res.status(500).json(Respuesta.error(null, "Error interno del servidor"));
    }
  }

  async getAllProyectos(req, res) {
    try {
      const proyectos = await Proyecto.findAll({
        order: [["fecha_inicio", "DESC"]], // Ordenar por fecha más reciente
      });

      if (proyectos.length > 0) {
        res.json(Respuesta.exito(proyectos, "Proyectos obtenidos correctamente"));
      } else {
        res.status(404).json(Respuesta.error(null, "No se encontraron proyectos"));
      }
    } catch (err) {
      console.error("Error al recuperar proyectos:", err);
      res.status(500).json(Respuesta.error(null, "Error interno del servidor"));
    }
  }

  async getProyectosPaginados(req, res) {
    let { page, limit } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5; 

    if (page < 1 || limit < 1) {
      return res.status(400).json(Respuesta.error(null, "Parámetros de paginación inválidos"));
    }

    try {
      const { count, rows } = await Proyecto.findAndCountAll({
        limit,
        offset: (page - 1) * limit, 
        order: [["fecha_inicio", "DESC"]], // Ordenar por fecha más reciente
      });

      res.json(
        Respuesta.exito(
          { total: count, totalPages: Math.ceil(count / limit), currentPage: page, data: rows },
          "Proyectos obtenidos correctamente"
        )
      );
    } catch (err) {
      console.error("Error al recuperar proyectos:", err);
      res.status(500).json(Respuesta.error(null, "Error interno del servidor"));
    }
  }
  
  
  
  async createProyecto(req, res) {
    // Implementa la lógica para crear un nuevo plato
    const proyecto = req.body;

    try {
      const proyectoNuevo = await Proyecto.create(proyecto);

      res.status(201).json(Respuesta.exito(proyectoNuevo, "Proyecto insertado"));
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(Respuesta.error(null, `Error al crear un proyecto nuevo: ${proyecto}`));
    }
  }

  async getAllProyecto(req, res) {
    try {
      const data = await Proyecto.findAll(); // Recuperar todos los proyecto
      res.json(Respuesta.exito(data, "Datos de proyectos recuperados"));
    } catch (err) {
      // Handle errors during the model call
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al recuperar los datos de los proyectos: ${req.originalUrl}`
          )
        );
    }
  }

  async deleteProyecto(req, res) {
    const id_proyecto = req.params.id_proyecto;
    try {
      const numFilas = await Proyecto.destroy({
        where: {
          id_proyecto: id_proyecto,
        },
      });
      if (numFilas == 0) {
        // No se ha encontrado lo que se quería borrar
        res
          .status(404)
          .json(Respuesta.error(null, "No encontrado: " + id_proyecto));
      } else {
        res.status(204).send();
      }
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al eliminar los datos: ${req.originalUrl}`
          )
        );
    }
  }

  async getProyectoId(req, res) {
    // El id plato viene en la ruta /api/platos/:idplato
    const id_proyecto = req.params.id_proyecto;
    try {
      const fila = await Proyecto.findByPk(id_proyecto);
      if (fila) {
        // Si se ha recuprado un plato
        res.json(Respuesta.exito(fila, "Proyecto recuperado"));
      } else {
        res.status(404).json(Respuesta.error(null, "Proyecto no encontrado"));
      }
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al recuperar los datos: ${req.originalUrl}`
          )
        );
    }
  }

  async updateProyecto(req, res) {
    const proyecto = req.body; // Recuperamos datos para actualizar
    const id_proyecto = req.params.id_proyecto; // dato de la ruta

    // Petición errónea, no coincide el id del plato de la ruta con el del objeto a actualizar
    if (id_proyecto != proyecto.id_proyecto) {
      return res
        .status(400)
        .json(Respuesta.error(null, "El id del proyecto no coincide"));
    }

    try {
      const numFilas = await Proyecto.update({ ...proyecto }, { where: { id_proyecto } });

      if (numFilas == 0) {
        // No se ha encontrado lo que se quería actualizar o no hay nada que cambiar
        res
          .status(404)
          .json(Respuesta.error(null, "No encontrado o no modificado: " + id_proyecto));
      } else {
        // Al dar status 204 no se devuelva nada
        // res.status(204).json(Respuesta.exito(null, "Plato actualizado"));
        res.status(204).send();
      }
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al actualizar los datos: ${req.originalUrl}`
          )
        );
    }
  }

  
}

module.exports = new ProyectoController();

// Structure of result (MySQL)
// {
//   fieldCount: 0,
//   affectedRows: 1, // Number of rows affected by the query
//   insertId: 1,     // ID generated by the insertion operation
//   serverStatus: 2,
//   warningCount: 0,
//   message: '',
//   protocol41: true,
//   changedRows: 0   // Number of rows changed by the query
// }
