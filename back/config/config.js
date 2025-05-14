require('dotenv').config(); // Без path

module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'secret',
}