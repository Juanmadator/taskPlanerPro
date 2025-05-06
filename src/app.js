

const express = require('express');
const usuarioRoutes = require('./routes/userRoutes.js');
const errorHandler = require('./middlewares/errorMiddleware');
const notFoundHandler = require('./middlewares/notFoundHandler');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize'); 

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(mongoSanitize());


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Demasiadas peticiones desde esta IP, intenta más tarde.',
});
app.use(limiter);

app.use('/api/usuarios', usuarioRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

module.exports = app;
