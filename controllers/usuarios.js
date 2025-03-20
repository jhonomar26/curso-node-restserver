// Este archivo se encarga de los callbacks que tiene cada función de los endpoints
const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require("bcryptjs");



const { body } = require('express-validator');


// Controlador para manejar solicitudes GET
const usuariosGet = async (req = request, res = response) => {
    // Extracción de parámetros de la URL (query params)
    // req.query es un objeto que podemos desestructurar
    // Ejemplo: si no se envía 'page', su valor por defecto será 3
    // const { q, nombre = 'Not name', apikey, page = 3, limit } = req.query;
    // * Paginación, puede enviar argumentos desde la url y puedo hacer la desestructuación de cada uno de ellos
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    //*Disparar tanto el await de usuarios, como el de total de manera simultanea
    // Await, espera la resolucion de ambas promesas

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(Number(desde)).limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });

};

// Controlador para manejar solicitudes POST: En este caso para el almacenamiento de los usuarios
const usuariosPost = async (req, res = response) => {

    // Extraer el cuerpo de la solicitud (datos enviados por el usuario)
    const { nombre, correo, password, rol } = req.body;

    // Crear una nueva instancia de Usuario con los datos recibidos
    const usuario = new Usuario({ nombre, correo, password, rol });
    // Si se envían propiedades que no están en el modelo de Mongoose, serán ignoradas
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
const usuariosPut = async (req, res = response) => {
    // Extraer el ID de los parámetros de la URL=/*1312313192
    const { id } = req.params;
    // Extrae la propiedades _id, password...
    // ! ...resto: objeto literal
    const { _id, password, google, correo, ...resto } = req.body;
    // TODO validar contra base de datos
    if (password) {
        // * Encriptación la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json(
        usuario
    );
};

// Controlador para manejar solicitudes DELETE
const usuariosDelete = async (req = request, res = response) => {
    const { id } = req.params;
    //* Fisicamente lo eliminamos
    // En caso de que lo encuentre regresa su id, en caso de que no lo encuentre su valor del id sera null
    // const usuario = await Usuario.findByIdAndDelete(id);
    // Retorno el usuario que ha sido eliminado
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })
    const usuarioAutenticado = req.usuario

    res.json({
        usuario,
        usuarioAutenticado
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
