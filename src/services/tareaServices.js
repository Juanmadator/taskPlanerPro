const Tarea = require("../models/Tarea.js");

async function insertTarea(tareaData) {
  try {
    console.log("datos recibidos", tareaData);
    const tarea = new Tarea(tareaData);
    const res = await tarea.save();
    console.log("Tarea insertada:", res);
    return res;
  } catch (error) {
    console.error("Error al insertar tarea:", error);
    throw error;
  }
}

async function getTarea(id) {
  try {
    const tareas = await Tarea.findById(id);
    console.log("Tareas:", tareas);

    if (tareas !== null) {
      return tareas;
    }

    return [];
  } catch (error) {
    console.log("Error al obtener tareas:", error);
  }
}
async function getAllTareas() {
  try {
    const tareas = await Tarea.find();
    console.log("Tareas:", tareas);

    if (tareas !== null) {
      return tareas;
    }

    return [];
  } catch (error) {
    console.log("Error al obtener tareas:", error);
  }
}


async function updateTarea(idTarea, data) {
  try {
    data.ultimaActualizacion = new Date();

    const tarea = await Tarea.findByIdAndUpdate(idTarea, data, {
      new: true,
      runValidators: true,
    });

    if (!tarea) {
      throw new Error("Tarea no encontrada");
    }

    console.log("Tarea actualizado", tarea);
    return tarea;
  } catch (error) {
    console.error("Error al actualizar tarea", error);
    throw error;
  }
}

async function deleteTarea(id) {
  try {
    const tarea = await Tarea.findByIdAndDelete(id);

    if (!tarea) {
      throw new Error("Tarea no encontrada");
    }
    console.log("Tarea eliminado", tarea);
    return tarea;
  } catch (error) {
    console.log("Error al eliminar tarea", error);
    throw error;
  }
}

async function getAllTareasUsuario(filter = {}) {
  try {
    const tareas = await Tarea.find(filter).populate("usuarioId");
    if (!tareas) {
      return [];
    }
    return tareas;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  insertTarea,
  updateTarea,
  deleteTarea,
  getTarea,
  getAllTareasUsuario,
  getAllTareas
};
