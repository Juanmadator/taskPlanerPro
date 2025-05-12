const { getWebSocketServer } = require("../../websocket");
const {
  createEvento,
  deleteEvento,
  getAllEventos,
} = require("../services/eventoServices.js");
const {
  createEventoValidations,
} = require("../validations/eventoValidations");

const eventoController = {

  getAllEventos: [
    async (req, res) => {
      try {
        const data = await getAllEventos();
        res.status(200).json(data);
      } catch (error) {
        console.log("Error al recoger los eventos de la BBDD", error);
        res.status(500).json({
          error: "Error al recoger los eventos de la BBDD",
        });
      }
    },
  ],

  createEvento: [
    ...createEventoValidations,
    async (req, response) => {
      try {
        const newEvento = await createEvento(req.body);

        const wss = getWebSocketServer();
        if (wss && wss.clients) {
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(
                JSON.stringify({ event: "eventCreated", data: newEvento })
              );
            }
          });
        }
        response.status(201).json(newEvento);
      } catch (e) {
        console.log("Error al crear evento", e);
        response.status(500).json({ error: e.message });
      }
    },
  ],
  deleteEvento: [
    async (req, response) => {
      try {
        const { id } = req.params;
        const deletedEvento = await deleteEvento(id);

        const wss = getWebSocketServer();
        if (wss && wss.clients) {
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(
                JSON.stringify({ event: "eventDeleted", data: deletedEvento })
              );
            }
          });
        }
        response.status(200).json(deletedEvento);
      } catch (error) {
        console.log("Error al eliminar evento", error);
        response.status(500).json({ error: "Error al eliminar evento" });
      }
    },
  ],
};

module.exports = eventoController;
