//! Middleware, especializado en validar campos y permitir que el usuario continue o no 
const { validationResult } = require('express-validator');
//next, es la funcion que tengo que llamar si el middleware pasa
const validarCampos = (req, res, next) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}


module.exports = {
    validarCampos
}