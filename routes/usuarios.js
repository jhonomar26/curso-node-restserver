// ! Se definen las rutas y conecta los controladores
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
// Importamos los controladores que manejarán las solicitudes HTTP
const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
} = require('../controllers/usuarios');
const { check } = require('express-validator');

// Creamos una nueva instancia de Router
const router = Router();

// Definimos las rutas y las asociamos con sus respectivos controladores

// Ruta para manejar solicitudes GET en '/usuarios'
router.get('/', usuariosGet);

// Ruta para manejar solicitudes POST en '/usuarios'
// * Check, es un middleware, lo que quiere decir es que se ejecutara antes de hacer la petición
// Prepara los errores, en el request, todos los errores que hay 
router.post('/', [
    check('nombre', 'El nombre, es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo, no es válido').isEmail(),
    check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos
], usuariosPost);

// Ruta para manejar solicitudes PUT en '/usuarios/:id'
// Se espera un parámetro 'id' en la URL para identificar qué usuario actualizar
router.put('/:id', usuariosPut);

// Ruta para manejar solicitudes DELETE en '/usuarios'
router.delete('/', usuariosDelete);

// Ruta para manejar solicitudes PATCH en '/usuarios'
router.patch('/', usuariosPatch);

// Exportamos el router para que pueda ser utilizado en otros archivos
module.exports = router;
