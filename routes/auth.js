const { Router } = require('express');
const { check, checkSchema } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth')
const { validarCampos } = require('../middlewares/validar-campos')
// Creamos una nueva instancia de Router
const router = Router();

// Definimos las rutas y las asociamos con sus respectivos controladores

// Ruta para manejar solicitudes GET en '/usuarios'
router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);
router.post('/google', [
    check('id_token', 'Token de google es necesario').not().isEmpty(),
    validarCampos
], googleSignIn);

module.exports = router;