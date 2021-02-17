const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const usuariosGet = async (req, res) => {
    const {limite = 5, desde = 0} = req.query;

    // const usuarios = await Usuario.find({estado: true})
    //     .skip(+desde)
    //     .limit(+limite);

    // const total = await Usuario.countDocuments({estado: true});

    const resp = await Promise.all([
        Usuario.find({estado: true})
            .skip(+desde)
            .limit(+limite),
        Usuario.countDocuments({estado: true})
    ]);

    res.json({
        total: resp[1],
        usuarios: resp[0]
    });
}

const usuariosPost = async (req, res) => {
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(usuario.password, salt);

    await usuario.save();

    res.json({
        msg: 'post API - controlador',
        usuario
    });
}

const usuariosPut = async (req, res) => {
    const id = req.params.id;
    const { _id, password, google, correo, ...resto } = req.body;

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'put API - controlador',
        usuario
    });
}

const usuariosDelete = async (req, res) => {
    const id = req.params.id;
    // const usuario = await Usuario.findByIdAndRemove(id);
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });


    res.json({
        usuario
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}