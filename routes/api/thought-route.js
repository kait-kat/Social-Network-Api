const thoughtRouter = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thought-controllers');

thoughtRouter.route('/').get(getThoughts).post(createThought);

thoughtRouter.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

thoughtRouter.route('/:thoughtId/reactions').post(addReaction);

thoughtRouter.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = thoughtRouter;