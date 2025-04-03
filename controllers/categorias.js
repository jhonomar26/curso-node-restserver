const { response, request } = require("express");
const { Categoria, Usuario } = require('../models');

// ObtenerCategorias - paginado - total -populate
const obtenerCategorias = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    // Ejecutar ambas consultas en paralelo
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query).skip(Number(desde)).limit(Number(limite))
    ]);

    // Poblar los usuarios de cada categoría
    // await Promise.all, se utiliza dado que map no devuleve una promesa por si solo 
    const categoriasPopuladas = await Promise.all(
        // arrray devuelve un nuevo array con las categoria 
        categorias.map(async (categoria) => {
            // populate se aplica sobre consultas que devuelvan documentos en mongoose
            return await Categoria.findById(categoria._id).populate("usuario", "nombre correo rol");
        })
    );

    res.json({
        total,
        categorias: categoriasPopuladas
    });
};



// ObtenerCategoria  -populate {}
const obtenerCategoria = async (req = request, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate("usuario", "nombre correo rol")

    res.json({
        categoria
    });
}

const crearCategoria = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre });
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        })

    }
    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id

    }
    // Grabacion de la data a guardar
    const categoria = new Categoria(data);

    // Guardar DB
    await categoria.save();
    res.status(201).json(categoria);

}
// actualizar la categoria atraves del nombre
const actualizarCategoria = async (req, res) => {
    try {
        const { nombreHeader } = req.params; // Nombre actual de la categoría
        const { nombre: nuevoNombre } = req.body; // Nuevo nombre desde el body

        // Convertir nombres a mayúsculas para comparación consistente
        const nombreActual = nombreHeader.toUpperCase();
        const nombreNuevo = nuevoNombre.toUpperCase();

        // Buscar y actualizar la categoría
        const categoria = await Categoria.findOneAndUpdate(
            { nombre: nombreActual },
            { nombre: nombreNuevo },
            { new: true } // Retorna la categoría actualizada
        );

        if (!categoria) {
            return res.status(404).json({ msg: "Categoría no encontrada" });
        }

        res.json(categoria);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

const eliminarCategoria = async (req = request, res = response) => {

    // Controlador para manejar solicitudes DELETE
    const { id } = req.params;
    // Retorno a la categoria que ha sido eliminado
    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false })

    res.json({
        categoria
    });

}



// borrarCategoria - estado: false

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    eliminarCategoria
}