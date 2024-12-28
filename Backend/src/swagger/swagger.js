const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const serviceBasePath = `/rest/api`;

module.exports = function (app) {
    let swaggerDefinition = {
        openapi: "3.0.0", 
        info: {
          title: "Candidate Management System API's",
          description: "Welcome To Candidate Management System",
          version: "1.0",
        },
        servers: [
          {
            url: `http://${process.env.REMOTE_HOST}:${process.env.PORT}`,
          },
        ],
        produces: ["application/json"],
        host: process.env.HOST_NAME,
        basePath: serviceBasePath,
      };
      
  let options = {
    swaggerDefinition: swaggerDefinition,
    explorer: true,
    apis: [
      path.join(__dirname, "../controllers/*.js"),
      path.join(__dirname, "../routers/*.js"),
    ],
  };
  
  let extraOptions = {
    explorer: true,
    swaggerOptions: {
      validatorUrl: null,
    },
    customSiteTitle: "CANDIDATE MANAGEMENT SYSTEM",
  };
  swaggerSpec = swaggerJSDoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, extraOptions)
  );
};
