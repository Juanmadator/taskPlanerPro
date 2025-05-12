import { showNotification } from "./functions.js";
document.addEventListener("DOMContentLoaded", () => {
  cargarImagenes();
  document.getElementById("upload-form").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const form = document.getElementById("upload-form");
    const formData = new FormData(form);
  
    const token = sessionStorage.getItem("token");
  
    try {
      const res = await fetch("http://localhost:3000/api/images/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al subir imagen");
      } 
        showNotification("Imagen insertada",true)
      
    } catch (error) {

      setTimeout(() => {
        showNotification("Error al insertar imagen",false)
     },1000)
  
    }
  });
});



const cargarImagenes = async () => {
  const token = sessionStorage.getItem("token");
  const imagenesContainer = document.querySelector(".imagenes");

  try {
    const response = await fetch("http://localhost:3000/api/images");
    if (!response.ok) {
      throw new Error("Error al obtener las imágenes");
    }

    const imageUrls = await response.json();

    imagenesContainer.innerHTML = "";

    imageUrls.forEach((url) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("image-wrapper");

      const img = document.createElement("img");
      img.src = url;
      img.alt = "Imagen subida";
      img.style.width = "200px";

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Eliminar";
      deleteButton.type = "button";
      deleteButton.onclick = async (e) => {
        e.preventDefault(); 
        try {
          const filename = url.split("/").pop();
          const deleteResponse = await fetch(
            `http://localhost:3000/api/images/${filename}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!deleteResponse.ok) {
            throw new Error("Error al eliminar la imagen");
          }
            showNotification("Imagen eliminada",true)
            imageWrapper.remove();
         
        } catch (error) {
          showNotification("No se ha eliminado",false)
        }
      };

      imageWrapper.appendChild(img);
      imageWrapper.appendChild(deleteButton);
      imagenesContainer.appendChild(imageWrapper);
    });
  } catch (error) {
    imagenesContainer.innerHTML = "<p>Error al cargar las imágenes</p>";
  }
};
