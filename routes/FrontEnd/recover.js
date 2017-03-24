/**
 * Created by andreashammer on 27/12/2016.
 */
var router = require('express').Router();

router.get('/', function(req, res){
    if(req.query.id){
        Load({user: {_id: req.query.id}}, function(err, user){
            if(err){
                console.error(err);
                res.send(500, "Internal server error");
            }
            else if(user.blocked){
                res.render('recover_deep', {id: user._id});
            }
        });
    }
    else
        res.render('recover', {});
});

module.exports = router;