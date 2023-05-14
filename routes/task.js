const express = require('express');
const Task = require('../models/task');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API de gerenciamento de tarefas
 */

// Rota para criar uma nova tarefa
/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título da tarefa
 *               projectId:
 *                 type: integer
 *                 description: ID do projeto associado à tarefa
 *               userId:
 *                 type: integer
 *                 description: ID do usuário associado à tarefa
 *               status:
 *                 type: string
 *                 description: Status da tarefa
 *             example:
 *               title: Tarefa 1
 *               projectId: 1
 *               userId: 1
 *               status: Incompleta
 *     responses:
 *       200:
 *         description: Tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID da tarefa criada
 *                   example: 1
 *       500:
 *         description: Erro ao criar a tarefa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: Erro ao criar a tarefa
 */
router.post('/tasks', (req, res) => {
    const { title, projectId, userId, status } = req.body;
    Task.create(title, projectId, userId, status, (err, taskId) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao criar a tarefa' });
        }
        res.json({ id: taskId });
    });
});

// Rota para buscar todas as tarefas
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retorna todas as tarefas
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Lista de todas as tarefas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         description: Erro ao buscar as tarefas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: Erro ao buscar as tarefas
 */
router.get('/tasks', (req, res) => {
    Task.getAll((err, tasks) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao buscar as tarefas' });
        }
        res.json(tasks);
    });
});

// Rota para buscar uma tarefa por ID
/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Retorna uma tarefa por ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa a ser buscada
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarefa encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarefa não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: Tarefa não encontrada
 *       500:
 *         description: Erro ao buscar a tarefa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: Erro ao buscar a tarefa
 */
router.get('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    Task.getById(taskId, (err, task) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao buscar a tarefa' });
        }
        if (!task) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }
        res.json(task);
    });
});

// Rota para atualizar uma tarefa
/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Atualiza uma tarefa por ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa a ser atualizada
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskUpdate'
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *       500:
 *         description: Erro ao atualizar a tarefa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: Erro ao atualizar a tarefa
 */
router.put('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const { title, projectId, userId, status } = req.body;
    Task.update(taskId, title, projectId, userId, status, (err) => {
        if (err) {
            console.error(err);
            return res
                .status(500)
                .json({ error: 'Erro ao atualizar a tarefa' });
        }
        res.sendStatus(200);
    });
});

// Rota para excluir uma tarefa
/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Exclui uma tarefa por ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa a ser excluída
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarefa excluída com sucesso
 *       500:
 *         description: Erro ao excluir a tarefa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: Erro ao excluir a tarefa
 */
router.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    Task.delete(taskId, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao excluir a tarefa' });
        }
        res.sendStatus(200);
    });
});

module.exports = router;
