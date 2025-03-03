// Este archivo se encarga de los callback que tiene cada función de los endpoints
const { response, reques } = require('express');

const usuariosGet = (req = reques, res = response) => {
    // Extracción de params
    // req.query: Es un objeto, el cual puedo desestructurar
    // page=3, esto quiere decir que en caso de que no se envie page, su valor por defecto sera 3
    const { q, nombre = 'Not name', apikey, page = 3, limit } = req.query;
    res.json({
        msg: 'get api- controlador',
        q,
        nombre,
        apikey
    });
};

const usuariosPost = (req, res = response) => {
    // Información, tal cual la persona la esta enviando
    // Body: es un objeto js
    const body = req.body;
    const { nombre, edad } = req.body

    res.json({
        msg: 'post api- controlador',
        nombre,
        edad
    });
};
const usuariosPut = (req, res = response) => {
    const { id } = req.params;
    res.json({
        msg: 'put API- controlador',
        id
    });
};

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API- controlador'
    });
};
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API- controlador'
    });
};


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch,

}