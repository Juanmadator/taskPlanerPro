const Evento = require('../models/Evento');

// Obtener todos los eventos
const getAllEventos = async () => {
  try {
    const eventos = await Evento.find(); 
    return eventos; // Devuelve los eventos al controlador
  } catch (error) {
    console.error('Error al obtener los eventos:', error);
    throw new Error('Error al obtener los eventos'); // Lanza un error para que el controlador lo maneje
  }
};

// Crear un nuevo evento
const createEvento = async (eventoData) => {
  try {
    const nuevoEvento = new Evento(eventoData);
    return await nuevoEvento.save(); // Guarda y devuelve el evento creado
  } catch (error) {
    console.error('Error al crear el evento:', error);
    throw new Error('Error al crear el evento'); // Lanza un error para que el controlador lo maneje
  }
};

// Eliminar un evento
const deleteEvento = async (id) => {
  try {
    const eventoEliminado = await Evento.findByIdAndDelete(id);
    if (!eventoEliminado) {
      throw new Error('Evento no encontrado');
    }
    return eventoEliminado; // Devuelve el evento eliminado
  } catch (error) {
    console.error('Error al eliminar el evento:', error);
    throw new Error('Error al eliminar el evento'); 
  }
};

module.exports = {
  getAllEventos,
  createEvento,
  deleteEvento,
};