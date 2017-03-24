/**
 * Created by andreashammer on 20/12/2016.
 */
var router = {};
var User = connection.model('Users', require('../data/models/User'));

router.load = function(par, cb){
    User.find(par, function(err, users){
        if(err)
            console.error(err);
        cb(err, users);
    });
};

router.create = function(par, cb){
    User.create(par, function(err, user){
        if(err)
            console.error(err);
        cb(err, user);
    });
};

router.update = function(par, newData, cb){
    User.update(par, {$set: newData}, function(err, user){
        if(err)
            console.error(err);
        cb(err, user);
    })
};

module.exports = router;