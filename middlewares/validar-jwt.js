const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

const validarJWT = async (req = req, res = response, next) => {
    // Extraigo el atributo x-token del header
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }
    try {
        // !Este es el uid, del usuario al cual le pertenece ese token
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        console.log(uid)
        // Leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido -usuario no existe en DB'
            })
        }
        // verficar si el uid tiene estado en true
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no válido -usuario con estado false'
            })

        }
        req.usuario = usuario;
        next();
    } catch (error) {
        res.status(401).json({
            msg: 'Token, no válido'
        })
    }

}

module.exports = {
    validarJWT
}



