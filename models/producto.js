const { Schema, model } = require('mongoose');
const categoria = require('./categoria');

const ProductoSchema = new Schema({
    // Necesario saber el usuario que creo la categoria
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    precio: {
        type: Number,
        default: 0

    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    description: {
        type: String
    },
    disponible: {
        type: Boolean,
        default: true
    },
});

ProductoSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data;
};

module.exports = model('Producto', ProductoSchema);
