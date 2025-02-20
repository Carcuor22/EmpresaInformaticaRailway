const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');

// Rutas para tareas
router.get('/', tareaController.getAllTareas); // Obtener todas las tareas
router.get('/buscarporid', tareaController.getTareasByProyecto); // Buscar tareas por id_proyecto
router.get('/:id_tarea', tareaController.getTareaById); // Obtener una tarea por ID
router.post('/', tareaController.createTarea); // Crear una nueva tarea
router.delete('/:id_tarea', tareaController.deleteTarea); // Eliminar una tarea por ID
router.put('/:id_tarea', tareaController.updateTarea); // Actualizar una tarea por ID

module.exports = router;
