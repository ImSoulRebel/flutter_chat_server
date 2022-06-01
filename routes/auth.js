
/* 
 path: api/login
*/

const {Router} = require('express');
const { check } = require('express-validator');
const { login, crearUsuario, renewToken } = require('../controllers/auth');

const { validarCampos } = require('../middlewares/validar_campos');
const { validateJWT } = require('../middlewares/validate_jwt');

const router = Router();
router.post('/new', [
    //validador
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Debe ser un Email válido').isEmail(),
    check('password','Debe ser un password válido').not().isEmpty(),
    validarCampos
],crearUsuario);

router.post('/', [
    check('email', 'El Email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
],login);

router.get('/renew', validateJWT, renewToken)

module.exports = router;