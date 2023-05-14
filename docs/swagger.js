const swaggerJSDoc = require('swagger-jsdoc');

// Configuração do Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Manager API',
            version: '1.0.0',
            description:
                'Documentação da API de Gerenciamento de Tarefas para a aula de Paradigmas',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de Desenvolvimento',
            },
        ],
        components: {
            schemas: {
                Project: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        name: { type: 'string' },
                    },
                },
                Task: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        title: { type: 'string' },
                        projectId: { type: 'integer' },
                        userId: { type: 'integer' },
                        status: {
                            type: 'string',
                            enum: ['To Do', 'In Progress', 'Done'],
                        },
                    },
                },
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        name: { type: 'string' },
                        projectId: { type: 'integer' },
                    },
                },
            },
        },
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;
