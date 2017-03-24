/**
 * Created by andreashammer on 20/12/2016.
 */
var router = require('express').Router();
var sha = require('sha256');

router.get('/login', function(req, res){
    var par = {
        username: req.query.username,
        password: sha(req.query.password),
        blocked: false
    };
    Load({user: par}, function(err, users){
        console.log(users);
        if(err){
            res.send(500, err.message);
        }
        else if(users.length == 0){
            res.json({err: "No user found with those credentials"});
        }
        else if(users.length > 0){
            res.send(500, "Major security breach, more than one users... username: " + par.username + " password: " + par.password);
        }
        else {
            if(users.length)
                res.json(users[0]);
            else
                res.json(users);
        }
    });
});

router.get('/register', function(req, res){
    req.query.tripAdmin = false;
    req.query.admin = false;
    req.query.photoPermission = (req.query.photoPermission == "on");
    req.query.blocked = false;
    req.query.password = sha(req.query.password);

    var par = {
        username: req.query.username
    };
    Load({user: par}, function(err, users){
        if(err){
            console.error(err);
            res.send(500, err.message);
        }
        else if(users.length > 0){
            res.send(500, "Username is taken");
        }
        else {
            par = {
                email: req.query.email
            };
            Load({user: par}, function(err, users){
                if(err){
                    console.error(err);
                    res.send(500, err.message);
                }
                else if(users.length > 0){
                    res.send(500, "Email is used for another account");
                }
                else {
                    Create({user: req.query}, function(err, user){
                        res.json({_id: user._id});
                    });
                }
            });
        }
    });
});

router.get('/recover', function(req, res){
    var par = {
        email: req.query.email
    };

    Load({user: par}, function(err, user){
        if(err){
            console.error(err);
            res.send(500, err.message);
        }
        else if(user.length > 0){
            console.error('Recovery API => Multiple accounts with same email');
            res.send(500, "Internal Error");
        }
        else {
            Update({user: par}, {user: {blocked: true}}, function(){
                Mailer.send_recovery_mail(user, function(code, msg){
                    res.send(code, msg);
                });
            });
        }
    })
});

router.get('/recover_deep', function(req, res){
    Update({user: {_id: req.query.id, blocked: true}}, {user: {blocked: false, password: sha(req.query.password)}}, function(err){
        if(err){
            console.error(err);
            res.send(500, "Internal server error");
        }
        else {
            res.send(200, "Success");
        }
    });
});

router.get('/update', function(req, res){
    var par = {};
    for(var p in req.query){
        if(req.query.hasOwnProperty(p)){
            if(req.query[p] == "")
                delete req.query[p];
            else
                par[p] = req.query[p];
        }
    }
    if(par["check"] != undefined && par["data"] != undefined){
        par["check"]._id = req.cookies._id;
        par["check"].password = sha(par["check"].password);
        par["data"].password = sha(par["data"].password);
        Update({user: par["check"]}, {user: par["data"]}, function(err, user){
            if(err){
                console.error(err);
                res.send(500, err.message);
            }
            else if(user.n == 0){
                res.send(500, "Invalid password");
            }
            else {
                res.send(200, "Success");
            }
        });
    }
    else {
        Update({user: {_id: req.cookies._id}}, {user: par}, function(err, user){
            if(err){
                console.error(err);
                res.send(500, err.message);
            }
            else {
                res.send(200, "Success");
            }
        });
    }
});

module.exports = router;