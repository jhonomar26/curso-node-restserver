const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        // Conectar sin opciones obsoletas
        await mongoose.connect(process.env.MONGODB_ATLAS);

        console.log('Base de datos online');
    } catch (error) {
        console.error(error); // Para ver el error real en consola
        throw new Error("Error al iniciar la base de datos...");
    }
};

module.exports = { dbConnection };
