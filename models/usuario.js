const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    correo: { type: String, required: [true, 'El correo es obligatorio'], unique: true },
    password: { type: String, required: [true, 'La contraseña es obligatoria'] },
    img: { type: String },
    rol: { type: String, required: true, enum: ['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE'] },
    estado: { type: Boolean, default: true },
    google: { type: Boolean, default: false },
});
// Metodo que se ejecuta automaticamente cuando se covierte en un objeto Json, por ejemplo al enviar datos en una apiRest
UsuarioSchema.methods.toJSON = function () {
    // Extraigo los elementos que quiero que no se muestren, v, password...
    // this.toObject: convierte el documento a un objeto javascript estandar
    //* ...usuario: el resto de las propiedades del objeto
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id; // Renombrar _id a uid

    return usuario;
};

module.exports = model('Usuario', UsuarioSchema);
