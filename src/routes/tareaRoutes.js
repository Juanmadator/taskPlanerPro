const express = require('express');
const router = express.Router();
const { createTarea, updateTarea, getTarea,deleteTarea, getAllTareasUsuario,getAllTareas} = require('../controllers/tareaController.js');
const { verificarToken } = require('../middlewares/authMiddleware.js');

router.post('/register',verificarToken, createTarea);
router.put('/update/:id',verificarToken, updateTarea);
router.delete('/delete/:id',verificarToken, deleteTarea);
router.get('/:id', getTarea);
router.get('/usuario/:id', getAllTareasUsuario);
router.get('/', getAllTareas);

module.exports = router;
