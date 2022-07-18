const { User } = require('../models');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find().populate({ path: 'thoughts' }).populate({ path: 'friends' });
            !users.length ? res.status(404).json({ message: 'No users found' }) : res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser({ body }, res) {
        try {
            const user = await User.create(body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}