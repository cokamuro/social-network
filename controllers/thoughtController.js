const { User, Thought } = require('../models');

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            !thoughts.length ? res.status(404).json({ message: 'No thoughts found' }) : res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getOneThought({ params }, res) {
        try {
            const thought = await Thought.findOne({ _id: params.thoughtId });
            !thought ? res.status(404).json({ message: `Thought with id ${params.thoughtId} not found` }) : res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought({ body }, res) {
        try {
            const thought = await Thought.create(body);
            const user = User.findOneAndUpdate({ username: body.username }, { $addToSet: { thoughts: thought._id } }, { new: true })
            !user ? res.status(404).json({ message: `User ${body.username} not found` }) : res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}