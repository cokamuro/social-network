
const router = require('express').Router();
const { getAllThoughts, createThought,
    getOneThought, updateThought, deleteThought,
    addReaction, removeReaction} = require('../../controllers/thoughtController');

// api/thoughts
router.route('/')
    // get all thoughts
    .get(getAllThoughts)
    // post to create a new thought - also put the thought on the user's thoughts array field
    .post(createThought);

// api/thoughts/:thoughtId
router.route('/:thoughtId')
    // get a single thought by id
    .get(getOneThought)
    // put to update thought by id
    .put(updateThought)
    // delete to remove thought by id
    .delete(deleteThought);

// api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions/:reactionId')
    // post to create a reaction stored in a single thought's reactions array
    .post(addReaction)
    // delete to pull and remove a reaction by the reactionId value
    .delete(removeReaction);

module.exports = router;