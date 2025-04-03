# WebServer+ RestServer

Este es un **REST API** construido con **Node.js** y **Express**, desplegado en un **WebServer + RestServer**. Implementa autenticación de usuarios con roles de **admin y user**, registro mediante correo electrónico y gestión de categorías.

## 📌 Características

- 🔐 **Autenticación y autorización** (usuarios con roles: `admin` y `user`)
- 📧 **Registro de usuarios mediante correo electrónico**
- 📂 **Gestión de categorías** con operaciones CRUD
- ✅ **Pruebas realizadas con Postman**
- 🌎 **Desplegado en un servidor**
- ⚡ **Código modular y escalable**

## 🔥 Instalación y configuración

### 📌 Requisitos previos
Asegúrate de tener instalado en tu sistema:

- [Node.js](https://nodejs.org/) (versión recomendada: LTS)
- [MongoDB](https://www.mongodb.com/) o una base de datos en la nube como MongoDB Atlas

### 📥 Clonar el repositorio
```bash
git clone https://github.com/jhonomar26/curso-node-restserver.git
cd curso-node-restserver
```
## 📦 Instalar dependencias

Ejecuta el siguiente comando para instalar las dependencias necesarias:

```bash
npm install
```

## ⚙️ Configurar variables de entorno

Renombra el archivo `.env.example` a `.env` y configura tus credenciales:

```env
PORT=8080
MONGODB_CNN=mongodb+srv://user:password@cluster.mongodb.net/dbname
SECRETORPRIVATEKEY=your_secret_key
```

## 🚀 Ejecutar en desarrollo

Para iniciar la aplicación en modo de desarrollo, utiliza uno de los siguientes comandos:

```bash
npm start
```

O si prefieres utilizar Nodemon:

```bash
npm run dev
```

