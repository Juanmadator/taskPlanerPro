const { getWebSocketServer } = require("../../websocket");
const {
  insertTarea,
  updateTarea,
  getTarea,
  deleteTarea,
  getAllTareasUsuario,
  getAllTareas,
} = require("../services/tareaServices");
const {
  createTareaValidations,
  updateTareaValidations,
  getTareaValidations,
} = require("../validations/tareaValidations");

const tareaController = {
  getTarea: [
    ...getTareaValidations,
    async (req, res) => {
      try {
        const { id } = req.params;
        const data = await getTarea(id);
        res.status(200).json(data);
      } catch (error) {
        console.log("Error al recoger tarea de la BBDD", error);
        res.status(500).json({
          error: "Error al recoger tarea de la BBDD",
        });
      }
    },
  ],
  getAllTareasUsuario: [
    async (req, res) => {
      try {
        const { id } = req.params;
        const data = await getAllTareasUsuario({ usuarioId: id });
        res.status(200).json(data);
      } catch (error) {
        console.log("Error al recoger las tareas de la BBDD", error);
        res.status(500).json({
          error: "Error al recoger las tareas de la BBDD",
        });
      }
    },
  ],

  getAllTareas: [
    async (req, res) => {
      try {
        const data = await getAllTareas();
        res.status(200).json(data);
      } catch (error) {
        console.log("Error al recoger las tareas de la BBDD", error);
        res.status(500).json({
          error: "Error al recoger las tareas de la BBDD",
        });
      }
    },
  ],
  createTarea: [
    ...createTareaValidations,
    async (req, response) => {
      try {
        const newTarea = await insertTarea(req.body);

        const wss = getWebSocketServer();
        if (wss && wss.clients) {
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(
                JSON.stringify({ event: "taskCreated", data: newTarea })
              );
            }
          });
        }
        response.status(201).json(newTarea);
      } catch (e) {
        console.log("Error al crear tarea", e);
        response.status(500).json({ error: e.message });
      }
    },
  ],
  updateTarea: [
    ...updateTareaValidations,
    async (req, response) => {
      try {
        const { id } = req.params;
        const TareaData = req.body;
        const updatedTarea = await updateTarea(id, TareaData);

        const wss = getWebSocketServer();
        if (wss && wss.clients) {
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(
                JSON.stringify({ event: "taskUpdated", data: updatedTarea })
              );
            }
          });
        }
        response.status(200).json(updatedTarea);
      } catch (e) {
        console.log("Error al actualizar tarea", e);
        response.status(500).json({ error: "Error al actualizar tarea" });
      }
    },
  ],
  deleteTarea: [
    async (req, response) => {
      try {
        const { id } = req.params;
        const deletedTarea = await deleteTarea(id);

        const wss = getWebSocketServer();
        if (wss && wss.clients) {
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(
                JSON.stringify({ event: "taskDeleted", data: deletedTarea })
              );
            }
          });
        }
        response.status(200).json(deletedTarea);
      } catch (error) {
        console.log("Error al eliminar tarea", error);
        response.status(500).json({ error: "Error al eliminar tarea" });
      }
    },
  ],
};

module.exports = tareaController;
