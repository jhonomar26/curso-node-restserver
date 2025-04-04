const { Schema, model } = require('mongoose');

const CategoriaSchema = new Schema({
    estado: {
        type: Boolean,
        default: true,
        required: true,
    },
    // Necesario saber el usuario que creo la categoria
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,

    }
});

CategoriaSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data;
};

module.exports = model('categoria', CategoriaSchema);
