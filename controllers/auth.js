// Este archivo se encarga de los callbacks que tiene cada función de los endpoints
const { response } = require('express');
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {

    const { correo, password } = req.body
    try {
        // verificar si el email existe
        const usuario = await Usuario.findOne({ correo });


        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos -estado: false'
            })

        }
        // verificar si el usuario esta activo en mi base de datos 
        // contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos -password'
            })

        }
        // generar el jwt

        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })

    }


}
const googleSignIn = async (req = request, res = response) => {
    const { id_token } = req.body;

    try {
        const { nombre, img, correo } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            // Crear nuevo usuario
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true,
                rol: 'USER_ROLE'
            };

            usuario = new Usuario(data);

            try {
                await usuario.save();
                console.log('Usuario guardado con éxito');
            } catch (error) {
                console.error('Error al guardar usuario:', error);
                return res.status(500).json({ msg: 'Error al guardar el usuario en la base de datos' });
            }
        }

        if (!usuario.estado) {
            return res.status(400).json({ msg: 'Hable con el administrador - usuario bloqueado' });
        }

        // Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({ usuario, token });

    } catch (error) {
        console.error('Error en googleSignIn:', error);
        return res.status(400).json({ ok: false, msg: 'El token no se puede verificar' });
    }
};


module.exports = {
    login,
    googleSignIn
}