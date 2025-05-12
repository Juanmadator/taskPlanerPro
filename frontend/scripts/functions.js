const socket = new WebSocket("ws://localhost:3000");

import { getFormInputs, verifytaskTitle, showMessage } from "./index.js";

//funcion para actualizar una tarea
export const updateTask = async (event) => {
  event.preventDefault();
  const updatedTask = {
    titulo: document.querySelector("#title").value,
    descripcion: document.querySelector("#description").value,
    estado: document.querySelector("#state").value,
    usuarioId: JSON.parse(sessionStorage.getItem("user")).id,
    fecha: document.querySelector("#date-end").value,
  };

  const token = sessionStorage.getItem("token");
  const { taskId } = JSON.parse(localStorage.getItem("taskToEdit"));
  try {
    const response = await fetch(
      `http://localhost:3000/api/tareas/update/${taskId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTask),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al actualizar la tarea");
    }

    showMessage("taskUpdated");
    localStorage.removeItem("taskToEdit");
    clearForm();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (error) {
    showMessage("errorEdit");
    
  }
};

//funcion para eliminar la tarea
export const deleteTask = async (idTarea) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await fetch(
      `http://localhost:3000/api/tareas/delete/${idTarea}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al eliminar tarea");
    }

    showMessage("taskDeleted");
    setTimeout(() => {
      window.location.reload(); // Recargar para reflejar los cambios
    }, 500);
  } catch (error) {
    showMessage("errorDelete");
  }
};

//funcion para crear la tarea
export const createTask = async (event) => {
  event.preventDefault();
  const { title, state, description, dateEnd } = getFormInputs();
  let added = false;
    const validStates = ["completado", "en-progreso", "pendiente"];
    const isValidState = validStates.includes(state.value.toLowerCase());

    if (
      title.value &&
      state.value &&
      description.value &&
      dateEnd.value &&
      isValidState
    ) {
      const { id } = JSON.parse(sessionStorage.getItem("user"));
      const token = sessionStorage.getItem("token");
      const tarea = {
        titulo: title.value,
        descripcion: description.value,
        estado: state.value,
        usuarioId: id,
      };

      try {
        const res = await fetch("http://localhost:3000/api/tareas/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(tarea),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Error al crear tarea");
        }
        added = true;
        localStorage.removeItem("taskToEdit");
      } catch (error) {
        showMessage("errorCreate");
      }
    }

    if (!added) {
      showMessage("errorCreate");
    } else {
      showMessage("taskCreated");
      clearForm();
    }
};

//funcion para cargar en el dom los elementos dinamicamente
export const createTaskElement = (title, description, date, state, idTarea) => {
  const div = document.createElement("div");
  div.setAttribute("id", idTarea);
  div.classList.add("task");
  const article = document.createElement("article");
  article.classList.add("tasks__task");

  const h4 = document.createElement("h4");
  h4.textContent = title;

  const p = document.createElement("p");
  p.classList.add("tasks__task-description");
  p.textContent = `${description}`;

  const dateSpan = document.createElement("span");
  dateSpan.textContent = date;
  const deleteSpam = document.createElement("span");
  deleteSpam.textContent = "Eliminar";
  deleteSpam.classList.add("eliminarBtn");
  const stateSpan = document.createElement("span");
  stateSpan.classList.add(state.toLowerCase(), "state");
  stateSpan.textContent = state.charAt(0).toUpperCase() + state.slice(1);

  article.appendChild(h4);
  article.appendChild(p);
  article.appendChild(dateSpan);
  article.appendChild(stateSpan);

  div.appendChild(article);
  div.appendChild(deleteSpam);
  return div;
};

export const clearForm = () => {
  let { title, state, description } = getFormInputs();
  title.value = "";
  state.value = "";
  description.value = "";
};

//funcion para obtener imagen aletoria de rickymotty
export const getRandomCharacters = async (count = 5) => {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();
    const total = data.info.count;
    const randomIds = Array.from(
      { length: count },
      () => Math.floor(Math.random() * total) + 1
    );

    const charactersResponse = await fetch(
      `https://rickandmortyapi.com/api/character/${randomIds.join(",")}`
    );
    const charactersData = await charactersResponse.json();

    const characters = Array.isArray(charactersData)
      ? charactersData
      : [charactersData];

    characters.forEach((char) => {
      const img = document.createElement("img");
      img.classList.add("rickAndMorty");
      img.title = "Imagen de rick y morty";
      img.src = char.image;
      img.alt = char.name;
      img.style.width = "50px";
      img.style.margin = "10px";
      document.body.appendChild(img);
    });
  } catch (error) {
  }
};

// Escuchar eventos del servidor
socket.onmessage = (event) => {
  const message = JSON.parse(event.data);

  if (message.event === "taskCreated") {
    showNotification(`Nueva tarea creada: ${message.data.titulo}`);
  } else if (message.event === "taskUpdated") {
    showNotification(`Tarea actualizada: ${message.data.titulo}`);
  } else if (message.event === "taskDeleted") {
    showNotification(`Tarea eliminada: ${message.data.titulo}`);
  }
};

// Función para mostrar notificaciones
export function showNotification(message,success=true) {
  const notification = document.createElement("div");
  notification.classList.add("notification");
  if (success) {
    notification.classList.add("showNotification-success");
  } else {
    notification.classList.add("showNotification-error");
    
  }
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 5000);
}
