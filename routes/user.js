const express = require('express');
const User = require('../models/user');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API de gerenciamento de usuários
 */

// Rota para criar um novo usuário
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do usuário
 *               projectId:
 *                 type: integer
 *                 description: ID do projeto ao qual o usuário pertence
 *             example:
 *               name: John Doe
 *               projectId: 1
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do usuário criado
 *                   example: 1
 *       500:
 *         description: Erro ao criar o usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: Erro ao criar o usuário
 */
router.post('/users', (req, res) => {
    const { name, projectId } = req.body;
    User.create(name, projectId, (err, userId) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao criar o usuário' });
        }
        res.json({ id: userId });
    });
});

// Rota para buscar todos os usuários
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna a lista de usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Erro ao buscar os usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: Erro ao buscar os usuários
 */
router.get('/users', (req, res) => {
    User.getAll((err, users) => {
        if (err) {
            console.error(err);
            return res
                .status(500)
                .json({ error: 'Erro ao buscar os usuários' });
        }
        res.json(users);
    });
});

// Rota para buscar um usuário por ID
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retorna um usuário por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser buscado
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: Usuário não encontrado
 *       500:
 *         description: Erro ao buscar o usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: Erro ao buscar o usuário
 */
router.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    User.getById(userId, (err, user) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao buscar o usuário' });
        }
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json(user);
    });
});

// Rota para atualizar um usuário
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser atualizado
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Novo nome do usuário
 *               projectId:
 *                 type: integer
 *                 description: Novo ID do projeto ao qual o usuário pertence
 *             example:
 *               name: John Doe
 *               projectId: 1
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       500:
 *         description: Erro ao atualizar o usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: Erro ao atualizar o usuário
 */
router.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { name, projectId } = req.body;
    User.update(userId, name, projectId, (err) => {
        if (err) {
            console.error(err);
            return res
                .status(500)
                .json({ error: 'Erro ao atualizar o usuário' });
        }
        res.sendStatus(200);
    });
});

// Rota para excluir um usuário
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Exclui um usuário por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser excluído
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso
 *       500:
 *         description: Erro ao excluir o usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: Erro ao excluir o usuário
 */
router.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    User.delete(userId, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao excluir o usuário' });
        }
        res.sendStatus(200);
    });
});

module.exports = router;
