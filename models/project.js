const db = require('../config');

class Project {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    // Método para criar um novo projeto
    static create(name, callback) {
        db.run(
            'INSERT INTO projects (name) VALUES (?)',
            [name],
            function (err) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, this.lastID); // Retorna o ID do novo projeto criado
            }
        );
    }

    // Método para buscar todos os projetos
    static getAll(callback) {
        db.all('SELECT * FROM projects', function (err, rows) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, rows);
        });
    }

    // Método para buscar um projeto por ID
    static getById(id, callback) {
        db.get(
            'SELECT * FROM projects WHERE id = ?',
            [id],
            function (err, row) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, row);
            }
        );
    }

    // Método para atualizar um projeto
    static update(id, name, callback) {
        db.run(
            'UPDATE projects SET name = ? WHERE id = ?',
            [name, id],
            function (err) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null);
            }
        );
    }

    // Método para excluir um projeto
    static delete(id, callback) {
        db.run('DELETE FROM projects WHERE id = ?', [id], function (err) {
            if (err) {
                callback(err);
                return;
            }
            callback(null);
        });
    }
}

module.exports = Project;
