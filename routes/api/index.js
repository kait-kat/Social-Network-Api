const apiRouter = require('express').Router();
const userRoutes = require('./user-route');
const thoughtRoutes = require('./thought-route');

apiRouter.use('/users', userRoutes);
apiRouter.use('/thoughts', thoughtRoutes);

module.exports = apiRouter;