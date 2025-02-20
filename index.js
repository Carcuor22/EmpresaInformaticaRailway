// Importar libreria para manejo de ficheros de configuración
require("dotenv").config();
// Importar fichero de configuración con variables de entorno
const config = require("./config/config");
// Importar librería express --> web server
const express = require("express");
// Importar librería path, para manejar rutas de ficheros en el servidor
const path = require("path");
// Importar libreria CORS
const cors = require("cors");
// Importar librería de manejo de cookies
const cookieParser = require("cookie-parser");
// Importar gestores de rutas
const proyectoRoutes = require("./routes/proyectoRoutes");
const tareaRoutes = require("./routes/tareaRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Configurar middleware para analizar JSON en las solicitudes
app.use(express.json());

// Configurar CORS para admitir cualquier origen
// app.use(cors()); // No permitiría el envío de cookies

// Configurar CORS para admitir el origen del frontend en desarrollo
app.use(
  cors({
    origin: "http://localhost:5173", // Permitir el frontend en desarrollo
    credentials: true, // Permitir envío de cookies
  })
);
// Habilitar el análisis de cookies
app.use(cookieParser());

// Configurar rutas de la API Rest
app.use("/api/proyectos", proyectoRoutes);
app.use("/api/tareas", tareaRoutes);
app.use("/api/users", userRoutes);

// Configurar el middleware para servir archivos estáticos desde el directorio 'public\old_js_vainilla'
app.use(express.static(path.join(__dirname, "public")));

//Ruta para manejar las solicitudes al archivo index.html
// app.get('/', (req, res) => {
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Iniciar el servidor
app.listen(config.port, () => {
  console.log(`Servidor escuchando en el puerto ${config.port}`);
});
