const usuariosGet = (req, res) => {
    const query = req.query;

    res.json({
        msg: 'get API - controlador',
        query
    });
}

const usuariosPost = (req, res) => {
    const {nombre, apellidos} = req.body;

    res.json({
        msg: 'post API - controlador',
        nombre,
        apellidos
    });
}

const usuariosPut = (req, res) => {
    const id = req.params.id;

    res.json({
        msg: 'put API - controlador',
        id: id
    });
}

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API - controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}