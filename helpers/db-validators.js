const Role = require('../models/role');
const Usuario = require('../models/usuario');

const validateRole = async (rol = '') => {
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw new Error('El rol no es válido.');
    }
};

const emailExiste = async (correo) => {
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) {
        throw new Error('El email ya existe.');
    }
};

const existeUsuario = async (id) => {
    const existeId = await Usuario.findById(id);
    if (!existeId) {
        throw new Error('El id no existe');
    }
}

module.exports = {
    validateRole,
    emailExiste,
    existeUsuario
}