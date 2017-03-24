/**
 * Created by andreashammer on 25/12/2016.
 */
var router = {};
var Trip = connection.model('Trips', require('../data/models/Trip'));

router.load = function(par, cb){
    Trip.find(par, function(err, users){
        if(err)
            console.error(err);
        cb(err, users);
    });
};

router.create = function(par, cb){
    Trip.create(par, function(err, user){
        if(err)
            console.error(err);
        cb(err, user);
    });
};

router.update = function(par, newData, cb){
    Trip.update(par, {$set: newData}, function(err, trip){
        if(err)
            console.error(err);
        cb(err, trip);
    })
};

module.exports = router;