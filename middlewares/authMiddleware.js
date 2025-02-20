// Importar librería de manejo de JWT
const jwt = require('jsonwebtoken');
// Importar libreria para manejo de ficheros de configuración
require('dotenv').config();
// Importar fichero de configuración con variables de entorno
const config = require('../config/config.js');
const {logMensaje} = require('../utils/logger.js');

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
    //  const token = req.headers['authorization']?.split(' ')[1]; // Obtén el token del encabezado si es el caso
    // Obtener el token de la cookie
    const token = req.cookies.token;
    console.log("Token: ", token);
    if (!token) {
        return res.status(401).json({ ok: false, datos: null , mensaje: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, config.secretKey); // Verifica el token
        req.user = decoded; // Adjunta los datos del usuario al objeto req (se agrega la propiedad al objeto req)
        next(); // Continúa al siguiente middleware o controlador
    } catch (err) {
        logMensaje.error(`Error al verificar el token: ${err.message}`);
        return res.status(403).json({ ok: false, datos: null , mensaje: 'Token inválido o expirado' });
    }
};

module.exports = { verifyToken };
