const mysql = require('mysql2/promise');
const dbConfig = require('../config/database');

const pool = mysql.createPool(dbConfig);

const User = {
    findByUsernameOrEmail: async (username, email) => {
        try {
            // Если email не передан, то используем только username для поиска
            if (!email) {
                const [rows] = await pool.execute(
                    'SELECT id, username, email, password FROM users WHERE username = ?',
                    [username]
                );
                return rows[0];
            }
            
            // Если переданы оба параметра, ищем по обоим
            const [rows] = await pool.execute(
                'SELECT id, username, email, password FROM users WHERE username = ? OR email = ?',
                [username, email]
            );
            return rows[0];
        } catch (error) {
            console.error('Ошибка в модели User (findByUsernameOrEmail):', error);
            throw error;
        }
    },

    // Другие методы остаются без изменений
    

    findById: async (id) => {
        try {
            const [rows] = await pool.execute(
                'SELECT id, username, email FROM users WHERE id = ?',
                [id]
            );
            return rows[0];
        } catch (error) {
            console.error('Ошибка в модели User (findById):', error);
            throw error;
        }
    },

    create: async (username, email, hashedPassword) => {
        try {
            const [result] = await pool.execute(
                'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
                [username, email, hashedPassword]
            );
            return result.insertId;
        } catch (error) {
            console.error('Ошибка в модели User (create):', error);
            throw error;
        }
    }
};

module.exports = User;
