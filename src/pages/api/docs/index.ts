import { withSwagger } from 'next-swagger-doc'
// http://localhost:3000/api/docs
const swaggerHandler = withSwagger({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NextJS Swagger',
      version: '0.1.0'
    }
  },
  apiFolder: './src/pages/api'
})
export default swaggerHandler()
