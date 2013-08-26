define(["jquery"], function ($) {

    var apiRoot = 'collections/',

    getApi = function (apiName) {
        return apiRoot + apiName;
    },

    getApiById = function (apiName, id) {
        return apiRoot + apiName + '/' + id;
    },

    get = function (apiName, customErrorMessage) {
        var deferred = $.Deferred();
        $.ajax({
            url: getApi(apiName),
            type: 'GET',
            success: deferred.resolve,
            error: function (e, title, error) {
                raiseError(e, title, error, customErrorMessage, deferred);
            }
        });

        return deferred.promise();
    },

    post = function (apiName, data, customErrorMessage) {

        var deferred = $.Deferred();

        $.ajax({
            url: getApi(apiName),
            type: 'POST',
            data: JSON.stringify(normalizeData(data)),
            contentType: 'application/json',
            success: deferred.resolve,
            error: function (e, title, error) {
                raiseError(e, title, error, customErrorMessage, deferred);
            }
        });

        return deferred.promise();
    },

    update = function (apiName, data, customErrorMessage) {

        var deferred = $.Deferred();

        $.ajax({
            url: getApiById(apiName, data.id),
            type: 'PUT',
            data: JSON.stringify(normalizeData(data)),
            contentType: 'application/json',
            success: deferred.resolve,
            error: function (e, title, error) {
                raiseError(e, title, error, customErrorMessage, deferred);
            }
        });

        return deferred.promise();
    },

    del = function (apiName, id, customErrorMessage) {

        var deferred = $.Deferred();
        $.ajax({
            url: getApiById(apiName, id),
            type: 'DELETE',
            success: deferred.resolve,
            error: function (e, title, error) {
                raiseError(e, title, error, customErrorMessage, deferred);
            }
        });

        return deferred.promise();
    },

    normalizeData = function (data) {
        if (data['__ko_mapping__'] !== undefined) {
            delete data['__ko_mapping__'];
        }
        if (data['_id'] !== undefined) {
            delete data['_id'];
        }
        return data
    },

    raiseError = function (e, title, error, customErrorMessage, deferred) {
        var message = title + ' ' + (customErrorMessage !== undefined? customErrorMessage + " " : "") + error;
        console.log(message);
        alert(message);
        deferred.reject(e, title, error);
    };

    return {
        Get: get,
        Post: post,
        Update: update,
        Delete: del
    };
});