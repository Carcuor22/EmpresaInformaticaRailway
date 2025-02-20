// proyectoRoutes.js
const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');

// Rutas para proyectos
router.get("/filtrar", proyectoController.getProyectosFiltrados);
router.get('/', proyectoController.getAllProyecto); // Obtener todos los proyectos
router.get('/:id_proyecto', proyectoController.getProyectoId); // Obtener un proyecto por ID
router.post('/', proyectoController.createProyecto); // Crear un nuevo proyecto
router.delete('/:id_proyecto', proyectoController.deleteProyecto); // Eliminar un proyecto por ID
router.put('/:id_proyecto', proyectoController.updateProyecto); // Actualizar un proyecto por ID
router.get("/paginados", proyectoController.getProyectosPaginados);
router.get("/", proyectoController.getAllProyectos);

module.exports = router;
