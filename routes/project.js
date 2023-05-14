const express = require('express');
const Project = require('../models/project');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: API de gerenciamento de projetos
 */

// Rota para criar um novo projeto
/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Cria um novo projeto
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectCreate'
 *     responses:
 *       200:
 *         description: Projeto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID do projeto criado
 *                   example: 123456
 *       500:
 *         description: Erro ao criar o projeto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: Erro ao criar o projeto
 */
router.post('/projects', (req, res) => {
    const { name } = req.body;
    Project.createProject(name, (err, projectId) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao criar o projeto' });
        }
        res.json({ id: projectId });
    });
});

// Rota para buscar todos os projetos
/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Retorna todos os projetos
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Lista de projetos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       500:
 *         description: Erro ao buscar os projetos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: Erro ao buscar os projetos
 */
router.get('/projects', (req, res) => {
    Project.getAll((err, projects) => {
        if (err) {
            console.error(err);
            return res
                .status(500)
                .json({ error: 'Erro ao buscar os projetos' });
        }
        res.json(projects);
    });
});

// Rota para buscar um projeto por ID
/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Retorna um projeto por ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do projeto a ser buscado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Projeto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Projeto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: Projeto não encontrado
 *       500:
 *         description: Erro ao buscar o projeto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: Erro ao buscar o projeto
 */
router.get('/projects/:id', (req, res) => {
    const projectId = req.params.id;
    Project.getById(projectId, (err, project) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao buscar o projeto' });
        }
        if (!project) {
            return res.status(404).json({ error: 'Projeto não encontrado' });
        }
        res.json(project);
    });
});

// Rota para atualizar um projeto
/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Atualiza um projeto por ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do projeto a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectUpdate'
 *     responses:
 *       200:
 *         description: Projeto atualizado com sucesso
 *       500:
 *         description: Erro ao atualizar o projeto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: Erro ao atualizar o projeto
 */
router.put('/projects/:id', (req, res) => {
    const projectId = req.params.id;
    const { name } = req.body;
    Project.update(projectId, name, (err) => {
        if (err) {
            console.error(err);
            return res
                .status(500)
                .json({ error: 'Erro ao atualizar o projeto' });
        }
        res.sendStatus(200);
    });
});

// Rota para excluir um projeto
/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Exclui um projeto por ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do projeto a ser excluído
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Projeto excluído com sucesso
 *       500:
 *         description: Erro ao excluir o projeto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: Erro ao excluir o projeto
 */
router.delete('/projects/:id', (req, res) => {
    const projectId = req.params.id;
    Project.delete(projectId, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao excluir o projeto' });
        }
        res.sendStatus(200);
    });
});

module.exports = router;
