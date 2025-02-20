-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 05-02-2025 a las 18:05:37
-- Versión del servidor: 8.0.40
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `empresaInformatica`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyectos`
--

CREATE TABLE `proyectos` (
  `id_proyecto` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `proyectos`
--

INSERT INTO `proyectos` (`id_proyecto`, `nombre`, `descripcion`, `fecha_inicio`, `fecha_fin`) VALUES
(1, 'Desarrollo de aplicación móvil', 'Desarrollo de una aplicación móvil para la gestión de tareas', '2023-01-01', '2023-12-31'),
(2, 'Rediseño de sitio web', 'Rediseño de la página web corporativa con nueva interfaz de usuario', '2023-02-01', '2023-06-30'),
(3, 'Automatización de procesos internos', 'Automatización de procesos administrativos internos', '2023-03-01', '2023-09-30'),
(4, 'Lanzamiento de campaña publicitaria', 'Campaña de marketing digital para promoción de producto', '2023-04-01', '2023-05-31'),
(5, 'Actualización de CRM', 'Actualizar el sistema CRM a la nueva versión del software', '2023-01-15', '2023-04-15'),
(6, 'Mejora de infraestructura de servidores', 'Aumentar la capacidad de servidores y asegurar redundancia', '2023-05-01', '2023-08-31'),
(7, 'Integración de nuevos pagos en línea', 'Implementación de nuevo sistema de pagos en línea', '2023-02-15', '2023-07-15'),
(8, 'Auditoría de seguridad informática', 'Revisión y mejoras de seguridad en los sistemas', '2023-06-01', '2023-06-30'),
(9, 'Desarrollo de API para clientes', 'Crear una API para la integración con aplicaciones de clientes', '2023-01-01', '2023-12-31'),
(10, 'Migración de base de datos', 'Migrar base de datos a un sistema más robusto y eficiente', '2023-03-15', '2023-07-30'),
(11, 'Expansión de la red de oficinas', 'Abrir 3 nuevas sucursales en distintas ciudades', '2023-04-01', '2023-11-30'),
(12, 'Investigación de mercado', 'Estudio sobre el comportamiento del consumidor en línea', '2023-02-01', '2023-05-31'),
(13, 'Desarrollo de sistema de chat interno', 'Implementar un sistema de chat para la comunicación entre empleados', '2023-01-20', '2023-04-30'),
(14, 'Automatización de informes financieros', 'Desarrollar un sistema automático de generación de informes financieros', '2023-03-01', '2023-08-31'),
(15, 'Revisión y mantenimiento de equipos', 'Realizar mantenimiento preventivo de equipos de computación en todas las oficinas', '2023-04-01', '2023-07-15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

CREATE TABLE `tareas` (
  `id_tarea` int NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `id_proyecto` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tareas`
--

INSERT INTO `tareas` (`id_tarea`, `titulo`, `descripcion`, `id_proyecto`) VALUES
(1, 'Definir arquitectura de la aplicación', 'Definir la arquitectura de la nueva aplicación móvil.', 1),
(2, 'Diseño de interfaz de usuario', 'Crear los primeros prototipos del diseño de la interfaz de la aplicación.', 1),
(3, 'Desarrollo de API móvil', 'Desarrollar la API que utilizará la aplicación móvil.', 1),
(4, 'Rediseñar página de inicio', 'Rediseñar la página de inicio para mejorar la experiencia de usuario.', 2),
(5, 'Implementación de sección de blog', 'Desarrollar y lanzar la sección de blog en el sitio web.', 2),
(6, 'Pruebas de interfaz de usuario', 'Realizar pruebas de la nueva interfaz con usuarios reales.', 2),
(7, 'Automatizar entrada de datos', 'Automatizar el proceso de entrada de datos en el sistema de gestión.', 3),
(8, 'Integración con sistemas existentes', 'Integrar el sistema automatizado con los sistemas existentes.', 3),
(9, 'Planificar campaña en redes sociales', 'Planificar y coordinar la campaña en Instagram, Twitter y Facebook.', 4),
(10, 'Desarrollar contenido visual', 'Crear los gráficos y videos para la campaña publicitaria.', 4),
(11, 'Actualizar base de datos de clientes', 'Actualizar la base de datos de clientes del sistema CRM.', 5),
(12, 'Capacitar al equipo sobre nuevo CRM', 'Capacitar a los empleados sobre las nuevas funciones del CRM.', 5),
(13, 'Reforzar la seguridad en servidores', 'Realizar una auditoría y mejorar la seguridad en los servidores.', 6),
(14, 'Instalar nuevos servidores físicos', 'Instalar y configurar los nuevos servidores físicos para la red.', 6),
(15, 'Implementar sistema de pagos con criptomonedas', 'Añadir soporte para pagos con criptomonedas en el sitio web.', 7);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD PRIMARY KEY (`id_proyecto`);

--
-- Indices de la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD PRIMARY KEY (`id_tarea`),
  ADD KEY `id_proyecto` (`id_proyecto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  MODIFY `id_proyecto` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `tareas`
--
ALTER TABLE `tareas`
  MODIFY `id_tarea` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD CONSTRAINT `tareas_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id_proyecto`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
