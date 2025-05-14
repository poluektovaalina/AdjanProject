const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const config = require('../config/config');

const generateToken = (user) => {
 return jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: '1h' });
};

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findByUsernameOrEmail(username, email);
        if (existingUser) {
            return res.status(409).json({ message: 'Пользователь с таким именем или email уже существует.' });
         }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create(username, email, hashedPassword);

        res.status(201).json({ message: 'Регистрация прошла успешно!' });
        } catch (error) {
        console.error('Ошибка регистрации:', error);
        res.status(500).json({ message: 'Произошла ошибка при регистрации.' });
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findByUsernameOrEmail(username);
        if (!user) {
            return res.status(401).json({ message: 'Неверные учетные данные.' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
             return res.status(401).json({ message: 'Неверные учетные данные.' });
        }
        const token = generateToken(user);
        res.status(200).json({ token, userId: user.id, username: user.username });
        } catch (error) {
        console.error('Ошибка авторизации:', error);
        res.status(500).json({ message: 'Произошла ошибка при авторизации.' });
        }
};