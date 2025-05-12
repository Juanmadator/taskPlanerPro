const express = require('express');
const path = require("path");
const usuarioRoutes = require('./routes/userRoutes.js');
const tareaRoutes = require('./routes/tareaRoutes.js');
const imageRoutes = require("./routes/imageRoutes.js");
const eventosRoutes = require("./routes/eventoRoutes.js");
const errorHandler = require('./middlewares/errorMiddleware');
const notFoundHandler = require('./middlewares/notFoundHandler');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize'); 

const app = express();

app.use(cors());

app.use(express.json());


app.use(mongoSanitize());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Demasiadas peticiones desde esta IP, intenta más tarde.',
});
app.use(limiter);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/tareas', tareaRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/eventos", eventosRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

module.exports = app;
