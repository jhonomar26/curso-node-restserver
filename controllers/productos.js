const { request, response } = require('express');
const Producto = require('../models/producto');
require('../models/categoria');


const crearProducto = async (req = request, res = response) => {
    try {
        const { categoria, nombre, estado, disponible, ...resto } = req.body;

        // Crear objeto base
        const data = {
            ...resto,
            nombre: nombre.toUpperCase(),
            usuario: req.usuario._id, // Asegúrate que req.usuario esté seteado por tu middleware
            categoria: categoria,
        };

        const producto = new Producto(data);
        await producto.save();

        res.status(201).json(producto);
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

// ObtenerProductos - paginado - total -populate
const obtenerProductos = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    // Ejecutar ambas consultas en paralelo
    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        productos
    });
};



// ObtenerProducto  -populate {}
const obtenerProducto = async (req = request, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById(id)
        .populate("usuario", "nombre")
        .populate("categoria", "nombre")


    res.json({
        producto
    });
}
const actualizarProducto = async (req, res) => {
    try {
        const { _id, estado, usuario, nombre, ...data } = req.body;
        const { id } = req.params;

        if (!req.usuario) {
            return res.status(401).json({ msg: "El usuario no está autenticado" });
        }

        data.usuario = req.usuario._id;
        // Solo se actualizo el nombre del producto, si el usuario lo mando
        if (nombre) {
            data.nombre = nombre.toUpperCase();
        }

        const producto = await Producto.findByIdAndUpdate(id, data, { new: true }).populate('usuario', 'nombre correo');
        res.json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

const eliminarProducto = async (req = request, res = response) => {

    // Controlador para manejar solicitudes DELETE
    const { id } = req.params;
    // Retorno a la categoria que ha sido eliminado
    const producto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true })

    res.json({
        producto
    });




}


module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto
}
