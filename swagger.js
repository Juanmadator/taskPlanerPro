// swagger.js
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Mi API con Swagger',
    version: '1.0.0',
    description: 'Documentación de la API para mi proyecto Node.js',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Rutas donde están los comentarios Swagger
  apis: ['./src/**/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };
