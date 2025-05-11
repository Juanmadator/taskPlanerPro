const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Nombre único para cada archivo
  },
});

const fileFilter = (req, file, cb) => {
  // Validar que el archivo sea una imagen
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Aceptar el archivo
  } else {
    cb(new Error("El archivo no es una imagen válida"), false); // Rechazar el archivo
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limitar el tamaño del archivo a 5 MB
});

module.exports = upload;