const { thought, user } = require('../models');

const thoughtControllers = {

    getThoughts(req, res) {
        thought.find()
            .sort({ createAt: -1 })
            .then((dbThoughtData) => {
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    getSingleThought(req, res) {
        thought.findOne({ "_id": req.params.thoughtId })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No such thought.' });
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    createThought(req, res) {
        thought.create(req.body)
            .then((dbThoughtData) => {
                return user.findOneAndUpdate(
                    { "_id": req.body.userId },
                    { $push: { thoughts: dbThoughtData._id }},
                    { new: true }
                );
            })
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'Thought posted but by WHOMSTVE?' });
                }

                res.json({ message: 'Thought thunked'});
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    updateThought(req, res) {
        thought.findOneAndUpdate({ "_id": req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No such thought.' });
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    deleteThought(req, res) {
        thought.findOneAndUpdate({ "_id": req.params.thoughtId })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No such thought.'});
                }

                return user.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId }},
                    { new: true }
                );
            })
            .then((dbThoughtData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'Thought thunked but by WHOMSTVE?' });
                }
                res.json({ message: 'Begone thought.' });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    addReaction(req, res) {
        thought.findOneAndUpdate(
            { "_id": req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true }
        )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No such user.' });
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    removeReaction(req, res) {
        thought.findOneAndUpdate(
            { "_id": eq.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
          )
            .then((dbThoughtData) => {
              if (!dbThoughtData) {
                return res.status(404).json({ message: 'No such thought.' });
              }
              res.json(dbThoughtData);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json(err);
            });
    },
};

module.exports = thoughtControllers;