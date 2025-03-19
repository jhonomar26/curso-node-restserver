// Configurar y arrancar el servidor express
const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');
// *Configuracion y arranque del servidor
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        // *Estas son las rutas que yo tengo
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        // * Funciones que se ejecutan a la mitad de un proceso de petición HTTP
        // *Conectar a la base de datos
        this.conectarDB();
        this.middlewares();
        // Rutas de mi aplicación
        this.routes();
    }
    async conectarDB() {
        await dbConnection();

    }
    middlewares() {
        // Palabra clave para saber que es un middleware;
        //  Le dice que la carpeta public, puede ser accedida desde cualquier navegador
        // CORS
        this.app.use(cors());
        // Middleware: Analizar el cuerpo de la solicitud HTTP y 
        // convierte el contenido en formato json en objeto javascript
        this.app.use(express.json());
        // Directorio público
        //! Si alguien intenta acceder a /, busca un archivo en la carpeta public/
        // ! antes de ejecutar cualquier otra ruta.
        this.app.use(express.static('public'));
    }
    routes() {
        // Ahora la ruta es localhost:8080/api/usuarios
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }
    listen() {
        this.app.listen(
            this.port,
            () => console.log('Servidor corriendo en puerto', this.port)
        );
    }

}
module.exports = Server;