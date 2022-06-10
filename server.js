const restify = require('restify');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userController = require('./controllers/userController');

// Init dotenv
dotenv.config();

// Connect DB
mongoose.connect(process.env.DB_CONNECT, () => {
    if ((mongoose.connection.readyState) == 0) {
        console.log('Disconnect');
    } else if ((mongoose.connection.readyState) == 1) {
        console.log('DB is Connected');
    } else {
        console.log('Connecting');
    }
});

const server = restify.createServer();

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

// Routes
server.post('/api/user/register', userController.insertUser)


server.listen(3000, function () {
    console.log('%s listening at %s', server.name, server.url);
});