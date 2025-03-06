
const mongoose = require('mongoose')
const dbConnection = async () => {
    try {
        // Regresa una promesa de tipo mongoose
        await mongoose.connect(process.env.MONGODB_ATLAS);
        console.log('Base de datos online');
    } catch (error) {
        throw new Error("Error al iniciar la base de datos...")
    }

}
module.exports = { dbConnection }