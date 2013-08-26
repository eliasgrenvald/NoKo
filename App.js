var express = require('express'),
    http = require('http'),    
    mongoskin = require('mongoskin'),
    dataAccess = require("./DataAccess"),
    lessMiddleware = require('less-middleware'),
    io = require('socket.io'),
    pushingData = require('./PushingData');

var route = '/collections/:collectionName',
    routeWithId = '/collections/:collectionName/:id';

var app = express(),
    db = mongoskin.db('localhost:27017/maindb', { auto_reconnect: true, safe: true }),
    httpServer = http.createServer(app),
    socketio = io.listen(httpServer);

socketio.sockets.on('connection', function (socket) {    
    socket.on('Push New Reach', function (data) {        
        socket.emit('Add New Reach', pushingData.NewReachItem);
    });
    socket.on('Push New Publishing', function (data) {
        socket.emit('Add New Publishing', pushingData.NewPublishingItem);
    });
});

app.configure(function () {
    app.use(express.favicon());
    app.use(lessMiddleware({ src: __dirname + '/frontend' }));
    app.use(express.static(__dirname + '/frontend'));
    app.use(express.bodyParser());
});

app.param('collectionName', function (req, res, next, collectionName) {
    req.collection = db.collection(collectionName);
    return next();
});

app.get(route, dataAccess.get);
app.post(route, dataAccess.post);
app.get(routeWithId, dataAccess.getById);
app.put(routeWithId, dataAccess.put);
app.del(routeWithId, dataAccess.del);

db.open(function (err) {
    if (err) throw err;
    httpServer.listen(3000);    
});