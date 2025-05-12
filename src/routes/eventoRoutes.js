const express = require('express');
const router = express.Router();
const { 
  createEvento, 
  deleteEvento, 
  getAllEventos 
} = require('../controllers/eventoController.js');
const { verificarToken } = require('../middlewares/authMiddleware.js');

router.post('/create', verificarToken, createEvento);

router.delete('/delete/:id', verificarToken, deleteEvento);

router.get('/', getAllEventos);

module.exports = router;