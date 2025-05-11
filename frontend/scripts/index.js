import {
  createTask,
  updateTask,
  createTaskElement,
  clearForm,
  deleteTask,
  getRandomCharacters,
} from "./functions.js";

export let tasksArray = [];
export let temporalTask = {};
window.addEventListener("load", () => {
  let spinner = document.getElementById("spinner-tareas");
  let container = document.querySelector(".tasks");
  if (!sessionStorage.getItem("token") && !sessionStorage.getItem("user")) {
    window.location.href = "./pages/login.html";
  }
  if (spinner) {
    spinner.style.display = "block";
  }
  getWeather();
  if (sessionStorage.getItem("user")) { 
    let { rol } = JSON.parse(sessionStorage.getItem("user"));
    if (container && rol == 'admin') {
    loadTaskFromDatabase();
      
    }
  }
    loadAllTasks();

  let tasks = document.querySelectorAll(".tasks__task");
  let taskTitle = document.getElementById("title");
  let dateInput = document.getElementById("date-end");
  let btnCreate = document.getElementById("createTask");
  let btnUpdate = document.getElementById("editTask");

  if (btnCreate && btnUpdate && taskTitle) {
    btnCreate.addEventListener("click", createTask);
    btnUpdate.addEventListener("click", updateTask);
    taskTitle.addEventListener("input", verifytaskTitle);
  }

  tasks.forEach((el) => {
    getTaskContent(el);
  });

  const today = new Date();
  if (dateInput) {
    dateInput.value = formatDate(today);
  }

  const taskData = JSON.parse(localStorage.getItem("taskToEdit"));
  if (taskData && taskTitle) {
    document.querySelector("#title").value = taskData.taskTitle;
    document.querySelector("#description").value = taskData.taskDescription;
    document.querySelector("#state").value = taskData.taskState;
    document.querySelector("#date-end").value = taskData.taskDate;
  }

  getRandomCharacters(1);
});


const loadTaskFromDatabase = async () => {
  let spinner = document.getElementById("spinner-tareas");

  const tasksContainer = document.querySelector(".tasks");
  try {

    if (sessionStorage.getItem("user")) {
      const { id } = JSON.parse(sessionStorage.getItem("user"));
      const response = await fetch(`http://localhost:3000/api/tareas/usuario/${id}`);
   

    if (!response.ok) {
      throw new Error("Error al cargar las tareas desde la base de datos");
    }

    const tasks = await response.json();
    tasksArray = tasks;

    tasks.forEach((task) => {
      const formattedDate = formatDate(new Date(task.fecha));
      const newTaskElement = createTaskElement(
        task.titulo,
        task.descripcion,
        formattedDate,
        task.estado,
        task._id
      );
      if (tasksContainer) {
        tasksContainer.appendChild(newTaskElement);
      }
    });

    asignarEventosEliminar();
    asignarEventosEditar();
    if (spinner) {
      spinner.style.display = "none";
    }
      emptyArray();
      
    }

  } catch (error) {
    console.error("Error al cargar tareas:", error.message);
  }
};

const loadAllTasks = async() => {
  let spinner = document.getElementById("spinner-tareas");

  const tasksContainer = document.querySelector(".tasks");
  try {
    const response = await fetch(`http://localhost:3000/api/tareas`);

    if (!response.ok) {
      throw new Error("Error al cargar las tareas desde la base de datos");
    }

    const tasks = await response.json();
    tasksArray = tasks;

    tasks.forEach((task) => {
      const formattedDate = formatDate(new Date(task.fecha));
      const newTaskElement = createTaskElement(
        task.titulo,
        task.descripcion,
        formattedDate,
        task.estado,
        task._id
      );
      if (tasksContainer) {
        tasksContainer.appendChild(newTaskElement);
      }
    });

    asignarEventosEliminar();
    asignarEventosEditar();
    if (spinner) {
      spinner.style.display = "none";
    }
    emptyArray();
  } catch (error) {
    console.error("Error al cargar tareas:", error.message);
  }
}


const asignarEventosEliminar = () => {
  const filterSelect = document.getElementById("filter");

  if (filterSelect) {
    filterSelect.addEventListener("change", filterTasks);
    let btnDeletes = document.querySelectorAll(".eliminarBtn");
    for (const btn of btnDeletes) {
      btn.addEventListener("click", taskRemover);
    }
  }
};

const asignarEventosEditar = () => {
  const tareas = document.querySelectorAll(".tasks__task");
  tareas.forEach((el) => {
    el.addEventListener("click", () => getDataAndFill(el));
  });
};

//funcion para mostrar un mensaje en caso de que no haya tareas
const emptyArray = () => {
  let sectionEmpty = document.querySelector(".tasks");
  if (sectionEmpty.children.length == 0) {
    let p = document.createElement("p");
    p.classList.add("emptyP");
    let text = document.createTextNode(
      "No hay tareas. ¡Prueba a crear una nueva!"
    );
    p.appendChild(text);
    sectionEmpty.appendChild(p);
  } else {
    if (document.querySelector(".emptyP")) {
      document.querySelector(".emptyP").remove();
    }
  }
};

//funcion para eliminar la tarea
const taskRemover = (e) => {
  let idTarea = e.target.parentElement.id;
  deleteTask(idTarea);
};

//funcion que usa la api del tiempo
const getWeather = () => {
  navigator.geolocation.getCurrentPosition(
    async function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      //llamada a una api para obtener la localizacion
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const data = await response.json();

      const city =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.county;

      //aqui uso la api para obtener el clima en la ciudad del usuario
      fetch(`https://wttr.in/${city}?format=3`)
        .then((res) => res.text())
        .then((weather) => {
          document.getElementById("ciudad").textContent = city;
          document.getElementById("ciudad").classList.remove("spinner");
          document.getElementById("ciudad").textContent = weather;
        });
    },
    function (error) {
      console.error("Error al obtener ubicación:", error.message);
    }
  );
};

//funcion para obtener los datos de una tarea
export const getTaskContent = (e) => {
  let task = e;
  let taskTitle = task.children[0].textContent;
  let taskDescription = task.children[1].textContent;
  let taskDate = task.children[2].textContent;
  let taskState = task.children[3].textContent;
  let taskId = task.parentElement.id;

  task = {
    taskTitle,
    taskDescription,
    taskDate,
    taskState
  };

  //guardo cada tarea en el array
  let taskFind = tasksArray.find((el) => {
    return el.taskTitle == task.taskTitle;
  });

  if (!taskFind) {
    tasksArray.push(task);
  } else if (taskFind) {
    disableBtn(true, "createTask");
  }

  task = {
    taskTitle,
    taskDescription,
    taskDate,
    taskState,
    taskId
  };
  return task;
};

//obtener los datos de la tarea y rellenar el formulario
const getDataAndFill = (el) => {
  temporalTask = getTaskContent(el);
  localStorage.setItem("taskToEdit", JSON.stringify(temporalTask));
  window.location.href = "./pages/create.html";
};

// segun el primer parametro se deshabilitará o no y el segundo parámetro es el boton que quiero deshabilitar
const disableBtn = (valor = true, btn) => {
  let btnSelected = document.getElementById(btn);
  if (valor && btnSelected) {
    btnSelected.setAttribute("disabled", true);
  } else {
    if (btnSelected) {
      btnSelected.removeAttribute("disabled");
    }
  }
};

//funcion para formatear fecha
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

//funcion para obtener los datos del formulario
export const getFormInputs = () => {
  let title = document.getElementById("title");
  let description = document.getElementById("description");
  let state = document.getElementById("state");
  let dateEnd = document.getElementById("date-end");

  return {
    title,
    description,
    state,
    dateEnd,
  };
};

// funcion para comprobar que exista o no la tarea
export const verifytaskTitle = (titleParam, e = null) => {
  let currentValue = titleParam || e?.target?.value;
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const titleFind = tasks.find((task) => task.title === currentValue);

  if (titleFind) {
    disableBtn(true, "createTask");
    disableBtn(false, "editTask");

    //MOSTRAR ERROR DE QUE YA EXISTE
    showMessage("taskExists");
    return true;
  } else {
    disableBtn(false, "createTask");
    disableBtn(true, "editTask");
  }
};

//funcion para mostrar mensajes
export const showMessage = (id) => {
  document.getElementById(`${id}`).style.display = "block";
  setTimeout(() => {
    document.getElementById(`${id}`).style.display = "none";
  }, 2500);
};

//funcion para filtrar por estado
const filterTasks = (e) => {
  let value = e.target.value;
  const taskElements = document.querySelector(".tasks").children;
  let counter = 0;

  // Ocultamos el mensaje anterior si existe
  const oldMsg = document.querySelector(".emptyP");
  if (oldMsg) {
    oldMsg.remove();
  }

  for (const task of taskElements) {
    const span = task.querySelectorAll("span")[1];
    if (value === "todas" || (span && span.classList.contains(value))) {
      task.style.display = "flex";
      counter++;
    } else {
      task.style.display = "none";
    }
  }

  // Si no se encontró ninguna tarea visible, mostramos el mensaje
  if (counter === 0) {
    const sectionEmpty = document.querySelector(".tasks");
    const p = document.createElement("p");
    p.classList.add("emptyP");
    p.textContent = "No hay tareas. ¡Prueba a crear una nueva!";
    sectionEmpty.appendChild(p);
  }
};
