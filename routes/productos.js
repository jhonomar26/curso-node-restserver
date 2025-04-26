const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole, tieneRole } = require('../middlewares/')
const { existeProductoNombre, existeCategoriaId, existeProductoId, noExisteProductoNombre } = require('../helpers/db-validators');
const { crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto
} = require('../controllers/productos');
const router = Router();

router.get('/', obtenerProductos)
// * Hacer la validacion del id, para cada ruta donde se utilizara
router.get('/:id', [
    check('id', 'No es un ID válido en mongoDB').isMongoId(),
    check('id').custom(existeProductoId),
    validarCampos
],
    obtenerProducto
);

// Actualizar - privado - cualquiera con token válido
router.put('/:id', [
    validarJWT,
    esAdminRole,

    // Validación del ID del producto (de la URL)
    check('id', 'No es un ID válido de MongoDB').isMongoId(),
    check('id').custom(existeProductoId),

    // Validaciones del body
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(noExisteProductoNombre),
    check('categoria', 'El id de la categoría es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id válido de MongoDB').isMongoId(),
    check('categoria').custom(existeCategoriaId),

    validarCampos,
], actualizarProducto);

// Crear una nuevo producto -privado -cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(noExisteProductoNombre),
    check('categoria', 'El id de la categoria es obligatorio').not().isEmpty(),
    validarCampos,
    check('categoria', 'No es un id válido de MongoDB ').isMongoId(),
    check('categoria').custom(existeCategoriaId),
    validarCampos
], crearProducto);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido en mongoDB').isMongoId(),
    validarCampos,
    check('id').custom(existeProductoId),
    validarCampos
], eliminarProducto);


module.exports = router;