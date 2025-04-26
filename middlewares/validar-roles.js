const { response, request } = require("express")


const esAdminRole = (req = request, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quire veficar el role sin validar el token primero'
        });
    }
    const { rol, nombre } = req.usuario;
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre}, no es administrador - No puede hacer esto`
        })
    }
    next();

}
// ! ... :operador rest
const tieneRole = (...roles) => {
    return (req, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quire veficar el role sin validar el token primero'
            });
        }
        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere un o de estos roles ${roles}`
            })

        }
        next();
    }

}

module.exports = {
    esAdminRole,
    tieneRole
}