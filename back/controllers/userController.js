const User = require('../models/userModel');
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден.' });
        }
        const { password, ...userData } = user;
        res.json(userData);
    } catch (error) {
        console.error('Ошибка получения информации о пользователе:', error);
        res.status(500).json({ message: 'Произошла ошибка при получении информации о пользователе.' });
    }
};
