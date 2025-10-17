import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Inventario',
      version: '1.0.0',
      description: 'Documentación de la API con Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'],
}

export const swaggerSpec = swaggerJSDoc(options)

export function swaggerDocs(app) {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
