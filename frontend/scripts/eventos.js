const socket = new WebSocket("ws://localhost:3000");

const calendarEl = document.getElementById('calendar');

// Función para obtener los eventos
const fetchEventos = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/eventos', {});
    if (!response.ok) {
      throw new Error('Error al obtener los eventos');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al cargar los eventos:', error);
    return [];
  }
};

// Cargar el calendario con los eventos
const initCalendar = async () => {
  const eventosGuardados = await fetchEventos();

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'es',
    selectable: true,
    events: eventosGuardados.map((evento) => ({
      id: evento._id,
      title: evento.nombre,
      start: evento.fecha,
      description: evento.descripcion,
      createdAt: evento.createdAt,
      usuarioId: evento.usuarioId,
    })),
    eventDidMount: function (info) {
      const { description, createdAt, usuarioId } = info.event.extendedProps;
      if (description || createdAt) {
        info.el.title = `${info.event.title}
          Descripción: ${description || ''}
          Id del usuario: ${usuarioId || ''}
          Creado el: ${createdAt || ''}`;
      }
    },
    dateClick: async function (info) {
      const { value: title } = await Swal.fire({
        title: 'Nombre del evento',
        input: 'text',
        inputPlaceholder: 'Introduce el nombre del evento',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'El nombre del evento es obligatorio';
          }
        },
      });

      if (!title) return;

      const { value: description } = await Swal.fire({
        title: 'Descripción del evento',
        input: 'text',
        inputPlaceholder: 'Introduce la descripción del evento',
          showCancelButton: true,
         inputValidator: (value) => {
          if (!value) {
            return 'La descripción del evento es obligatorio';
          }
        },
      });
        
        if (!description) return;

      const fecha = info.dateStr;

      try {
        const token = sessionStorage.getItem('token');
        const { id } = JSON.parse(sessionStorage.getItem('user'));
        const response = await fetch('http://localhost:3000/api/eventos/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ nombre: title, descripcion: description || '', fecha, usuarioId: id }),
        });

        if (!response.ok) {
          throw new Error('Error al crear el evento');
        }

        const nuevoEvento = await response.json();
        calendar.addEvent({
          id: nuevoEvento._id,
          title: nuevoEvento.nombre,
          start: nuevoEvento.fecha,
          description: nuevoEvento.descripcion,
          createdAt: nuevoEvento.createdAt,
        });

        Swal.fire('Evento creado', 'El evento se ha creado correctamente', 'success');
      } catch (error) {
        console.error('Error al crear el evento:', error);
        Swal.fire('Error', 'No se pudo crear el evento', 'error');
      }
    },
    eventClick: async function (info) {
      const result = await Swal.fire({
        title: '¿Deseas eliminar este evento?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      });

      if (result.isConfirmed) {
        try {
          const token = sessionStorage.getItem('token');
          const response = await fetch(`http://localhost:3000/api/eventos/delete/${info.event.id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Error al eliminar el evento');
          }

          info.event.remove();
          Swal.fire('Evento eliminado', 'El evento se ha eliminado correctamente', 'success');
        } catch (error) {
          console.error('Error al eliminar el evento:', error);
          Swal.fire('Error', 'No se pudo eliminar el evento', 'error');
        }
      }
    },
  });

  calendar.render();
};

initCalendar();


// Escuchar eventos del servidor
socket.onmessage = (event) => {
  const message = JSON.parse(event.data);

  if (message.event === "eventCreated") {
    showNotification(`Nuevo evento creado: ${message.data.nombre}`);
  } else if (message.event === "eventUpdated") {
    showNotification(`Evento actualizado: ${message.data.nombre}`);
  } else if (message.event === "eventDeleted") {
    showNotification(`Evento eliminado: ${message.data.nombre}`);
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
