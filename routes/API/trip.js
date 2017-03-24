/**
 * Created by andreashammer on 25/12/2016.
 */
var router = require('express').Router();
var mongoose = require('mongoose');

router.get('/participate', function(req, res){
    var par = {};
    par._id = req.query.id;
    console.log(par);
    Load({trip: par}, function(err, trip){
        if(trip){
            if(!trip.participants){
                res.send(500, "Det oppsto et problem");
                return;
            }
            var p = trip.participants;
            var b = -1;
            for(var i = 0; i < p.length; i++){
                if(p[i] == req.cookies._id){
                    b = i;
                    break;
                }
            }
            if(b == -1)
                p.push(req.cookies._id);
            else
                p.splice(b, 1);
            Update({trip: par}, {trip: {participants: p}}, function(err, trip){
                if(err){
                    res.send(500, "Det oppsto et problem");
                }
                else{
                    res.json({msg: "Success", add: b == -1});
                }
            });
        }
    });
});

router.get('/add', function(req, res){
    var par = req.query;
    par.restrictionGroup = [];
    par.participants = [];
    par.creator = req.cookies._id;
    par.accountNumber = "";
    var date = new Date(par.dateOfEvent);
    date = new Date(date.getTime() - (req.cookies.timeoffset * 3600 * 1000));
    if(date == "Invalid Date") {
        date = new Date(par.dateOfEvent);
        console.error("The user's timeoffset is not set!");
    }
    par.dateOfEvent = date;
    Create({trip: par}, function(err, trip){
        console.log(err);
        if(err){
            console.error(err);
            res.send(500, "Internal server error");
        }
        else {
            res.send(200, "Success");
        }
    });
});

module.exports = router;