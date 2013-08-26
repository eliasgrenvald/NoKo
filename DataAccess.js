var mongoskin = require('mongoskin');

var success = 'success',
    error = 'error';

exports.get = function (req, res, next) {
    req.collection.find().toArray(function (e, results) {
        if (e) return next(e);
        res.send(results);
    })
};

exports.getById = function (req, res, next) {
    req.collection.findOne({ id: req.collection.id(req.params.id) }, function (e, result) {
        if (e) return next(e);
        res.send(result);
    })
};

exports.put = function (req, res, next) {
    req.collection.update({ id: req.collection.id(req.params.id) }, { $set: req.body }, { safe: true, multi: false }, function (e, result) {
        if (e) return next(e);
        res.send((result === 1) ? { msg: success } : { msg: error });
    })
};

exports.post = function (req, res, next) {
    req.collection.insert(req.body, {}, function (e, results) {
        if (e) return next(e);
        res.send(results);
    })
};

exports.del = function (req, res, next) {
    req.collection.remove({ id: req.collection.id(req.params.id) }, function (e, result) {
        if (e) return next(e);
        res.send((result === 1) ? { msg: success } : { msg: error });
    })
};