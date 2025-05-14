const mysql = require('mysql2/promise');
const dbConfig = require('../config/database');

const pool = mysql.createPool(dbConfig);

const Fruits = {
    getFruits: async () => {
        try {
            const [rows] = await pool.execute('SELECT * FROM fruits')
            return rows;
        } catch (error) {
            console.error('Ошибка в модели User (findByUsernameOrEmail):', error);
            throw error;
        }
    },


};

module.exports = Fruits;
