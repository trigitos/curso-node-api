const Router = require('express');
const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
} = require('../controllers/user');
const { validarCampos } = require('../middlewares/validar-campos');

const { check } = require('express-validator');
const { 
    validateRole,
    emailExiste,
    existeUsuario
 } = require('../helpers/db-validators');

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('correo', 'El correo no es válido.').isEmail(),
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('password', 'La contraseña debe tener mínimo 6 caracteres').isLength({min: 6}),
    // check('rol', 'Rol no válido.').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(validateRole),
    check('email').custom(emailExiste),
    validarCampos
], usuariosPost);

router.put('/:id', [
    check('id').isMongoId(),
    check('id').custom(existeUsuario),
    check('rol').custom(validateRole),
    validarCampos
], usuariosPut);

router.delete('/:id', [
    check('id').isMongoId(),
    check('id').custom(existeUsuario),
], usuariosDelete);


module.exports = router;