/**
 * Created by andreashammer on 23/09/2016
 */
var async = require('async');
var User = require('./user');
var Trip = require('./trip');
var Badge = require('./badge');

module.exports = function(par, callback){
    var calls = [];
    for(var p in par){
        if(par.hasOwnProperty(p)){
            calls.push(function(pp, datad){
                return function(cb) {
                    switch (pp) {
                        case "user":
                            User.load(datad, function(err, data){
                                cb(err, {key: pp, data: validateData(data)});
                            });
                            break;
                        case "trip":
                            Trip.load(datad, function(err, data){
                                cb(err, {key: pp, data: validateData(data)});
                            });
                            break;
                        case "badge":
                            Badge.load(datad, function(err, data) {
                                cb(err, {key: pp, data: validateData(data)});
                            });
                            break;
                        default:
                            cb(new Error("The parameter " + pp + " is not a valid data type"), null);
                            break;
                    }
                };
            }(p, par[p]));
        }
    }
    async.parallel(calls, function(err, result){
        if(err)
            callback(err);
        else {
            if(!result)
                callback(err, []);
            else if (result.length == 1)
                callback(null, result[0].data);
            else
                callback(null, result);
        }
    });
};

function validateData(data){
    if(data && data.length == 1){
        return data[0];
    }
    else {
        return data;
    }
}