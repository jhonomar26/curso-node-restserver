// Este archivo se encarga de los callbacks que tiene cada función de los endpoints
const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require("bcryptjs");

// Controlador para manejar solicitudes GET
const usuariosGet = (req = request, res = response) => {
    // Extracción de parámetros de la URL (query params)
    // req.query es un objeto que podemos desestructurar
    // Ejemplo: si no se envía 'page', su valor por defecto será 3
    const { q, nombre = 'Not name', apikey, page = 3, limit } = req.query;

    res.json({
        msg: 'GET API - Controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
};

// Controlador para manejar solicitudes POST
const usuariosPost = async (req, res = response) => {
   
    // Extraer el cuerpo de la solicitud (datos enviados por el usuario)
    const { nombre, correo, password, rol } = req.body;
    // Verificar el correo existente en la base de datos
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        return res.status(400).json({
            msg: 'El correo, ya esta registrado'
        })

    }

    // Crear una nueva instancia de Usuario con los datos recibidos
    // Si se envían propiedades que no están en el modelo de Mongoose, serán ignoradas
    const usuario = new Usuario({ nombre, correo, password, rol });
    // * Encriptación la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    await usuario.save();

    res.json({
        msg: 'POST API - Controlador',
        usuario
    });
};

// Controlador para manejar solicitudes PUT
const usuariosPut = (req, res = response) => {
    // Extraer el ID de los parámetros de la URL
    const { id } = req.params;

    res.json({
        msg: 'PUT API - Controlador',
        id
    });
};

// Controlador para manejar solicitudes DELETE
const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'DELETE API - Controlador'
    });
};

// Controlador para manejar solicitudes PATCH
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'PATCH API - Controlador'
    });
};

// Exportamos los controladores para ser usados en las rutas
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
};
