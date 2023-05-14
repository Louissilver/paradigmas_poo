const db = require('../config');

class User {
    constructor(id, name, projectId) {
        this.id = id;
        this.name = name;
        this.projectId = projectId;
    }

    // Método para criar um novo usuário
    static create(name, projectId, callback) {
        db.run(
            'INSERT INTO users (name, projectId) VALUES (?, ?)',
            [name, projectId],
            function (err) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, this.lastID); // Retorna o ID do novo usuário criado
            }
        );
    }

    // Método para buscar todos os usuários
    static getAll(callback) {
        db.all('SELECT * FROM users', function (err, rows) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, rows);
        });
    }

    // Método para buscar um usuário por ID
    static getById(id, callback) {
        db.get('SELECT * FROM users WHERE id = ?', [id], function (err, row) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, row);
        });
    }

    // Método para atualizar um usuário
    static update(id, name, projectId, callback) {
        db.run(
            'UPDATE users SET name = ?, projectId = ? WHERE id = ?',
            [name, projectId, id],
            function (err) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null);
            }
        );
    }

    // Método para excluir um usuário
    static delete(id, callback) {
        db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
            if (err) {
                callback(err);
                return;
            }
            callback(null);
        });
    }
}

module.exports = User;
