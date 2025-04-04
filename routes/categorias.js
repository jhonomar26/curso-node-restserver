const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole, tieneRole } = require('../middlewares/')
const {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    eliminarCategoria
} = require('../controllers/categorias');
const { existeCategoriaId, existeCategoriaNombre } = require('../helpers/db-validators');
const router = Router();
// Ruta para manejar solicitudes GET en '/categorias'
/**{{url}}/api/categorias* */
// Obtener todas las categorias - publico (quien sea puede acceder a las categorias)
router.get('/', obtenerCategorias)
// Obtener una categoria por id - publico 
// * Hacer la validacion del id, para cada ruta donde se utilizara
router.get('/:id', [
    check('id', 'No es un ID válido en mongoDB').isMongoId(),
    check('id').custom(existeCategoriaId),
    validarCampos
],
    obtenerCategoria
);

// Crear una nueva categoria -privado -cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);


// Actualizar - privado - cualquier con token valido
router.put('/:nombreHeader', [
    validarJWT,
    esAdminRole,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(existeCategoriaNombre),
    validarCampos
], actualizarCategoria);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido en mongoDB').isMongoId(),
    validarCampos,
    check('id').custom(existeCategoriaId),
    validarCampos
], eliminarCategoria);

module.exports = router;