const messengerRouter = require('./messenger');

function route(app) {
    app.use('/api/v1/messenger', messengerRouter);
}

module.exports = route;