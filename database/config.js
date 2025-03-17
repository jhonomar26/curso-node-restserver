const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        // Regresa una promesa de tipo mongoose
        await mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });


        console.log('Base de datos online');
    } catch (error) {
        console.error(error); // Para ver el error real en consola
        throw new Error("Error al iniciar la base de datos...");
    }
};

module.exports = { dbConnection };
