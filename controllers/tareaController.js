// Importar librería para respuestas
const Respuesta = require("../utils/respuesta.js");
// Recuperar función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");

// Cargar las definiciones del modelo en sequelize
const models = initModels(sequelize);
// Recuperar el modelo proyecto
const Proyecto = models.proyectos;
// Recuperar el modelo tarea
const Tarea = models.tareas;

class TareaController {

  async getTareasByProyecto(req, res) {
    const { id_proyecto } = req.query;
  
    // Validar que se ha enviado el id_proyecto
    if (!id_proyecto) {
      return res.status(400).json(
        Respuesta.error(null, "Debe proporcionar un id_proyecto para filtrar las tareas.")
      );
    }
  
    try {
      const tareas = await Tarea.findAll({
        where: { id_proyecto }, // Filtrar por id_proyecto
        include: [
          {
            model: Proyecto,
            as: "proyecto", // Alias correcto de la relación
          },
        ],
      });
  
      if (tareas.length > 0) {
        res.json(Respuesta.exito(tareas, "Tareas filtradas por id_proyecto"));
      } else {
        res.status(404).json(Respuesta.error(null, "No se encontraron tareas para este proyecto."));
      }
    } catch (err) {
      console.error("Error al recuperar tareas por id_proyecto:", err);
      res.status(500).json(
        Respuesta.error(null, `Error al recuperar tareas por id_proyecto: ${req.originalUrl}`)
      );
    }
  }
  



  // Obtener todas las tareas
  async getAllTareas(req, res) {
    try {
      const data = await Tarea.findAll({
        include: [{ model: Proyecto, as: "proyecto" }] // Incluye la información del proyecto relacionado
      });
  
      res.json(Respuesta.exito(data, "Datos de tareas recuperados"));
    } catch (err) {
      res.status(500).json(
        Respuesta.error(
          null,
          `Error al recuperar los datos de las tareas: ${req.originalUrl}`
        )
      );
    }
  }
  

  // Obtener una tarea por ID
  async getTareaById(req, res) {
    const id_tarea = req.params.id_tarea;
    try {
      const data = await Tarea.findByPk(id_tarea, {
        include: [
          {
            model: Proyecto,
            as: "proyecto", // Alias corregido a "proyecto"
          },
        ],
      });
      if (data) {
        res.json(Respuesta.exito(data, "Tarea recuperada"));
      } else {
        res.status(404).json(Respuesta.error(null, "Tarea no encontrada"));
      }
    } catch (err) {
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al recuperar la tarea: ${req.originalUrl}`
          )
        );
    }
  }

  // Crear una nueva tarea
  async createTarea(req, res) {
    const tarea = req.body;
    try {
      const newTarea = await Tarea.create(tarea);
      res.status(201).json(Respuesta.exito(newTarea, "Tarea creada"));
    } catch (err) {
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al crear la tarea, el id no existe o escribiste en otro formato: ${req.originalUrl}`
          )
        );
    }
  }

  // Actualizar una tarea por ID
  async updateTarea(req, res) {
    const id_tarea = req.params.id_tarea;
    const tarea = req.body;
    try {
      const numFilas = await Tarea.update(tarea, {
        where: { id_tarea },
      });
      if (numFilas[0] === 0) {
        res.status(404).json(Respuesta.error(null, "Tarea no encontrada"));
      } else {
        res.status(204).json(Respuesta.exito(null, "Tarea actualizada"));
      }
    } catch (err) {
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al actualizar la tarea: ${req.originalUrl}`
          )
        );
    }
  }

  // Eliminar una tarea por ID
  async deleteTarea(req, res) {
    const id_tarea = req.params.id_tarea;
    try {
      const numFilas = await Tarea.destroy({
        where: { id_tarea },
      });
      if (numFilas === 0) {
        res.status(404).json(Respuesta.error(null, "Tarea no encontrada"));
      } else {
        res.status(204).json(Respuesta.exito(null, "Tarea eliminada"));
      }
    } catch (err) {
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al eliminar la tarea: ${req.originalUrl}`
          )
        );
    }
  }
}


module.exports = new TareaController();
