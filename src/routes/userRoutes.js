const express = require('express');
const router = express.Router();
const { createUser,loginUser,getUsuarios} = require('../controllers/userController.js');
const { verificarToken } = require('../middlewares/authMiddleware.js');

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/',verificarToken, getUsuarios);

module.exports = router;
