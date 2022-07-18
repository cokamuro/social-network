const router = require('express').Router();
const { getAllUsers, createUser, 
    getOneUser, updateUser, deleteUser, 
    addToFriends, removeFromFriends } = require('../../controllers/user-controller');

// api/users
router.route('/')
    // get all users
    .get(getAllUsers)
    // post a new user
    .post(createUser);

// api/users/:userId
router.route('/:userId')
    // get single user by id, populated thought and friend data
    .get(getOneUser)
    // put to update a user by id
    .put(updateUser)
    // delete to remove user by id
    .delete(deleteUser);
    // bonus: remove a user's associated thoughts when deleted

// api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    // post to add a new friend to a user's friend list
    .post(addToFriends)
    // delete to remove a friend from a user's friend list
    .delete(removeFromFriends);

module.exports = router;