/**
 * Created by andreashammer on 25/12/2016.
 */
var async = require('async');
var User = require('./user');
var Trip = require('./trip');
var Badge = require('./badge');

module.exports =  function(par, newData, callback){
    var calls = [];
    for(var p in par){
        if(par.hasOwnProperty(p)){
            if(!par[p] || !newData[p]){
                callback(new Error("The parameter and update data doesn't have the samne porperties"), null);
                return;
            }
            calls.push(function(pp, datad, nd){
                return function(cb) {
                    switch (pp) {
                        case "user":
                            User.update(datad, nd, function(err, data){
                                cb(err, {key: pp, data: validateData(data)});
                            });
                            break;
                        case "trip":
                            Trip.update(datad, nd, function(err, data){
                                cb(err, {key: pp, data: validateData(data)});
                            });
                            break;
                        case "badge":
                            Badge.update(datad, nd, function(err, data){
                                cb(err, {key: pp, data: validateData(data)});
                            });
                            break;
                        default:
                            cb(new Error("The parameter " + pp + " is not a valid data type"), null);
                            break;
                    }
                };
            }(p, par[p], newData[p]));
        }
    }
    async.parallel(calls, function(err, result){
        if(err)
            callback(err);
        else {
            if(!result)
                callback(err, []);
            else if(result.length == 1)
                callback(err, result[0].data);
            else
                callback(err, result);
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