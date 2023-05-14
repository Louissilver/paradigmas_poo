const express = require('express');
const bodyParser = require('body-parser');
const tasksRouter = require('./routes/task');
const usersRouter = require('./routes/user');
const projectsRouter = require('./routes/project');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const db = require('./config');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware para processar o corpo das requisições como JSON
app.use(bodyParser.json());

// Rota de documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Configuração do CORS
app.use(cors());

// Rotas
app.use('/', tasksRouter);
app.use('/', usersRouter);
app.use('/', projectsRouter);

// Rota raiz
app.get('/', (req, res) => {
    res.send('API do Gerenciador de Tarefas');
});

// Inicialização das tabelas
db.serialize(() => {
    require('./tables');
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
