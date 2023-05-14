const db = require('../config');

class Task {
    constructor(id, title, projectId, userId, status) {
        this.id = id;
        this.title = title;
        this.projectId = projectId;
        this.userId = userId;
        this.status = status;
    }

    // Método para criar uma nova tarefa
    static create(title, projectId, userId, status, callback) {
        db.run(
            'INSERT INTO tasks (title, projectId, userId, status) VALUES (?, ?, ?, ?)',
            [title, projectId, userId, status],
            function (err) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, this.lastID); // Retorna o ID da nova tarefa criada
            }
        );
    }

    // Método para buscar todas as tarefas
    static getAll(callback) {
        db.all('SELECT * FROM tasks', function (err, rows) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, rows);
        });
    }

    // Método para buscar uma tarefa por ID
    static getById(id, callback) {
        db.get('SELECT * FROM tasks WHERE id = ?', [id], function (err, row) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, row);
        });
    }

    // Método para atualizar uma tarefa
    static update(id, title, projectId, userId, status, callback) {
        db.run(
            'UPDATE tasks SET title = ?, projectId = ?, userId = ?, status = ? WHERE id = ?',
            [title, projectId, userId, status, id],
            function (err) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null);
            }
        );
    }

    // Método para excluir uma tarefa
    static delete(id, callback) {
        db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
            if (err) {
                callback(err);
                return;
            }
            callback(null);
        });
    }
}

module.exports = Task;
