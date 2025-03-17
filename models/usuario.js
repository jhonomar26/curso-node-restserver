
// *model: Nos permite manejar grandes volumenes de datos
// Permite interactuar con la base de datos
const { Schema, model } = require('mongoose');
// *Schema: Define la estructura de los documentos en mongodb
const UsuarioSchema = Schema({
    // *Campo del schema con sus respectivas propiedades
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        // Impide que haya correos duplicados
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        // Define los valores permitidos
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false

    },


});
// * Quitar la contraseña y version
UsuarioSchema.methods.toJSON = function () {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
};

module.exports = model('Usuario', UsuarioSchema)