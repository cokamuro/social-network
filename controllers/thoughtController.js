const { User, Thought } = require('../models');

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            if (thoughts) {
                res.json(thoughts);
            } else {
                res.status(404).json({ message: 'No thoughts found' })
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought({ body }, res) {
        try {
            const thought = await Thought.create(body);
            const user = await User.findOneAndUpdate({ username: body.username }, { $addToSet: { thoughts: thought._id } }, { new: true })
            if (user) {
                res.json(thought);
            } else {
                res.status(404).json({ message: `User ${body.username} not found` });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getOneThought({ params }, res) {
        try {
            const thought = await Thought.findOne({ _id: params.thoughtId });
            if(thought){
                res.json(thought);
            } else {
                res.status(404).json({ message: `Thought with id ${params.thoughtId} not found` });
            }           
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateThought({ params, body }, res) {
        try {
            await Thought.updateOne({ _id: params.thoughtId }, body, { new: true, runValidators: true });
            const thought = await Thought.findOne({ _id: params.thoughtId });
            if (thought) {
                res.json(thought);
            } else {
                res.status(404).json({ message: `Thought with id ${params.thoughtId} not found` })
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThought({ params }, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: params.thoughtId });
            if (thought) {
                await User.updateOne({ thoughts: params.thoughtId }, { $pull: { thoughts: params.thoughtId } }, { new: true });
                res.json({ message: `Thought ${params.thoughtId} deleted` });
            } else {
                res.status(404).json({ message: `Thought with id ${params.thoughtId} not found` });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addReaction({ params, body }, res) {
        try {
            await Thought.updateOne({ _id: params.thoughtId }, { $push: { reactions: body }, new: true, runValidators: true });
            const thought = await Thought.findOne({ _id: params.thoughtId });
            if (thought) {
                res.json(thought);
            } else {
                res.status(404).json({ message: `Thought with id ${params.thoughtId} not found` })
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async removeReaction({ params }, res) {
        try {
            await Thought.updateOne({ _id: params.thoughtId }, { $pull: { reactions: { _id: params.reactionId } }, new: true });
            res.json({ message: `Reaction ${params.reactionId} deleted` });
        } catch (err) {
            res.status(500).json(err);
        }
    }
}