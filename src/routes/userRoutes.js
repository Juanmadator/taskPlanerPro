const express = require('express');
const router = express.Router();
const { crearUsuarioController,obtenerUsuariosController,login } = require('../controllers/userController.js');

router.post('/register', crearUsuarioController);
router.get('/', obtenerUsuariosController);
router.post('/login', login);

module.exports = router;
