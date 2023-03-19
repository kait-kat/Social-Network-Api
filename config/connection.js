const mongoose = require('mongoose');

mongoose.set(`strictQuery`, true)

const db = 'thoughts'

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/thoughts',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose.connection;