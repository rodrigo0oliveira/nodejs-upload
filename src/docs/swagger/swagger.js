const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API UPLOAD NODE-JS',
      version: '1.0.0',
      description: 'Upload api with node js',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  apis: [path.resolve(__dirname, '../../routes/*.js')],
};

swaggerOptions.swaggerDefinition.components = {
    securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
}

const swaggerSpec = swaggerJSDoc(swaggerOptions);
module.exports = swaggerSpec;

