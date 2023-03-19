const mainRouter = require('express').Router();
const apiRoutes = require('./api');

mainRouter.use('/api', apiRoutes);

mainRouter.use((req, res) => {
  return res.send('This is not a correct route');
});

module.exports = mainRouter;