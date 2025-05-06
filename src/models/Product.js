const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  categoria: {
    type: String,
    required: true,
  },
  marca: {
    type: String,
    required: true,
  },
  codigoProducto: {
    type: String,
    required: true,
    unique: true,
  },
  fechaFabricacion: {
    type: Date,
    required: true,
  },
  garantiaMeses: {
    type: Number,
    required: true,
    min: 0,
  },
  peso: {
    type: Number,
    required: true,
    min: 0,
  },
  dimensiones: {
    alto: {
      type: Number,
      required: true,
      min: 0,
    },
    ancho: {
      type: Number,
      required: true,
      min: 0,
    },
    profundidad: {
      type: Number,
      required: true,
      min: 0,
    }
  }
  ,
  coloresDisponibles: {
    type: [String],
  },
  etiquetas: {
    type: [String],
  },
  imagenes: {
    type: [String],
  },
  esActivo: {
    type: Boolean,
    required: true,
    default: true,
  },
  fechaCreacion: {
    type: Date,
    required: true,
    default: Date.now,
  },
  ultimaActualizacion: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// ultimaActualizacion: Date (requerido, default fecha actual)
// Crear el modelo de usuario
const Product = mongoose.model('Product', productSchema); // Colección: products

module.exports = Product; 