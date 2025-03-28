const jwt = require('jsonwebtoken')

const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        // El uid, sirve para que luego lo podamos para validar
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se puedo generar el token');
            } else {
                resolve(token);
            }
        })

    })
}

module.exports = { generarJWT }