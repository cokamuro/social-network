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
    },
    async getOneUser({ params }, res) {
        try {
            const user = await User.findOne({ _id: params.userId }).populate({ path: 'thoughts' }).populate({ path: 'friends' });
            !user ? res.status(404).json({ message: `No user with id ${params.userId}` }) : res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser({ params, body }, res) {
        try {
            await User.updateOne({ _id: params.userId }, body, { new: true, runValidators: true });
            const user = await User.findOne({ _id: params.userId });
            !user ? res.status(404).json({ message: `No user with id ${params.userId}` }) : res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser({ params }, res) {
        try {
            const user = await User.findOneAndDelete({ _id: params.userId });
            if (!user) res.status(404).json({ message: `No user with id ${params.userId}` });
            else {
                await User.updateMany({ _id: { $in: user.friends } }, { $pull: { friends: params.userId } });
                await Thought.deleteMany({ username: user.username });
                res.json({ message: `User ${user.username} deleted` });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
}