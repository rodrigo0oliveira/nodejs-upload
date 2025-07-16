const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
openapi: '3.0.0',
info: {
title: 'Upload API',
version: '1.0.0',
description: 'Api for images upload',
},
};

const options = {
swaggerDefinition,
apis: ['../src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;

