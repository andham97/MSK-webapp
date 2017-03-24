/**
 * Created by andreashammer on 18/02/2017.
 */
var router = {};
var Badge = connection.model('Badges', require('../data/models/Badge'));

router.load = function(par, cb){
    Badge.find(par, function(err, users){
        if(err)
            console.error(err);
        cb(err, users);
    });
};

router.create = function(par, cb){
    Badge.create(par, function(err, user){
        if(err)
            console.error(err);
        cb(err, user);
    });
};

router.update = function(par, newData, cb){
    Badge.update(par, {$set: newData}, function(err, user){
        if(err)
            console.error(err);
        cb(err, user);
    })
};

module.exports = router;