const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100
  },
  descripcion: {
    type: String,
    maxlength: 500
  },
  estado: {
    type: String,
    enum: ['pendiente', 'en-progreso', 'completado'],
    default: 'pendiente',
  },
  fecha: {
    type: Date,
    required: true,
    default: Date.now
  },
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Tarea', tareaSchema);
