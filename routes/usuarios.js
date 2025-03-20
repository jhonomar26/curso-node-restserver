// ! Se definen las rutas y conecta los controladores
// Definimos las rutas y las asociamos con sus respectivos controladores
const { Router } = require('express');
const { check } = require('express-validator');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');
const {
    validarCampos, validarJWT, esAdminRole, tieneRole
} = require('../middlewares')

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
// Importamos los controladores que manejarán las solicitudes HTTP
const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
} = require('../controllers/usuarios');

// Creamos una nueva instancia de Router
const router = Router();

// Ruta para manejar solicitudes GET en '/usuarios'
router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID válido en mongoDB').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').optional().custom(esRoleValido),
    validarCampos
], usuariosPut);
// Ruta para manejar solicitudes POST en '/usuarios'
//*Check, es un middleware, lo que quiere decir es que se ejecutara antes de hacer la petición
// Prepara los errores, en el request, todos los errores que hay 
router.post('/', [
    check('nombre', 'El nombre, es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo, no es válido').isEmail(),
    check('correo').custom(emailExiste),
    // custom, recibe como argumento el valor que estoy evaluando del body, en este caso el rol
    //    *(rol)=> esRoleValido(rol) == esRoleValido
    check('rol').custom(esRoleValido),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos
], usuariosPost);

// Ruta para manejar solicitudes PUT en '/usuarios/:id'
// Se espera un parámetro 'id' en la URL para identificar qué usuario actualizar

// Ruta para manejar solicitudes DELETE en '/usuarios'
router.delete('/:id',
    [
        validarJWT,
        esAdminRole,
        tieneRole('ADMIN_ROLE', 'USER_ROLE'),
        check('id', 'No es un ID válido en mongoDB').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos
    ],
    usuariosDelete);

// Ruta para manejar solicitudes PATCH en '/usuarios'
router.patch('/', usuariosPatch);

// Exportamos el router para que pueda ser utilizado en otros archivos
module.exports = router;
