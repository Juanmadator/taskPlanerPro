document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const mensaje = document.getElementById("mensaje");

  try {
    const res = await fetch("http://localhost:3000/api/usuarios/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password: password }),
    });

    const data = await res.json();

    if (res.ok) {
      validarToken(data)
      mensaje.style.display = "block";
      mensaje.textContent = "Inicio de sesión exitoso";
       window.location.href = '../index.html';
    } else {
      mensaje.style.color = "white";
      mensaje.style.display = "block";
      mensaje.style.backgroundColor = "red";
      mensaje.textContent = data.message || "Error al iniciar sesión";
    }
  } catch (err) {
    mensaje.style.color = "red";
    mensaje.textContent = "Error de red o servidor";
  } finally {
    setTimeout(() => {
      mensaje.style.display = "none";
    }, 2500);
  }
});

const validarToken = (data) => {
  if (data.token) {
    sessionStorage.setItem("token", data.token);
  } 
  sessionStorage.setItem("user", JSON.stringify(data.usuario));

  return;
};
