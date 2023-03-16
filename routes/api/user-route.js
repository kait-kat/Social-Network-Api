const userRouter = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/user-controller');

userRouter.route('/').get(getUsers).post(createUser);
userRouter.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);
userRouter.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = userRouter;
