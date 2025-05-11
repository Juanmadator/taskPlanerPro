document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();  
  
    const nombre = document.getElementById('nombre').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rol = document.getElementById('rol').value;
    console.log(rol)
    try {
      const response = await fetch('http://localhost:3000/api/usuarios/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, username, email, password,rol })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "¡Usuario registrado!",
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          window.location.href = './login.html';  
       },1500)
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Fallo al registrar el usuario",
          showConfirmButton: false,
          timer: 1500
        })
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('Error en el servidor');
    }
  });
  