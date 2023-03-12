const { user, thought } = require('../models');

const userController = { 
    getUsers(req, res) {
        user.find()
            .select('-__v')
            .then((dbUserData) => {
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    getSingleUser(req, res) {
        user.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('friends')
            .populate('thoughts')
            .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'User does not exist.' });
            }
            res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    createUser(req, res) {
        user.create(req.body)
          .then((dbUserData) => {
            res.json(dbUserData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },

    updateUser(req, res) {
        user.findOneAndUpdate(
          { _id: req.params.userId },
          {
            $set: req.body,
          },
          {
            runValidators: true,
            new: true,
          }
        )
          .then((dbUserData) => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'User does not exist.' });
            }
            res.json(dbUserData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },

    deleteUser(req, res) {
        user.findOneAndDelete({ _id: req.params.userId })
          .then((dbUserData) => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'No such user.' });
            }
    
            return thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
          })
          .then(() => {
            res.json({ message: 'User and thoughts have been removed.' });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },

    addFriend(req, res) {
        user.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true })
          .then((dbUserData) => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'No such user.' });
            }
            res.json(dbUserData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },

    removeFriend(req, res) {
        user.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
          .then((dbUserData) => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'No such user.' });
            }
            res.json(dbUserData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },
};
    
module.exports = userController;    