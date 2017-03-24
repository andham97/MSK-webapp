/**
 * Created by andreashammer on 25/12/2016.
 */
var router = require('express').Router();
var mongoose = require('mongoose');
var async = require('async');

router.get('/myTrips', function(req, res, next){
    Load({user: {_id: req.cookies._id}}, function(err, user) {
        if (err) {
            console.error(err);
            next();
            return;
        }
        else if(!user.tripAdmin){
            console.error("A user trying to access without admin access");
            next();
            return;
        }
        if(req.query.id){
            Load({trip: {creator: req.cookies._id, _id: req.query.id}}, function (err, trip) {
                if (err) {
                    console.error(err);
                    next();
                }
                else{
                    console.log(trip);
                    var t = "";
                    var calls = [];

                    var date = new Date(trip.dateOfEvent);
                    date = new Date(date.getTime() + (req.cookies.timeoffset * 3600 * 1000));
                    if (date == "Invalid Date") {
                        date = new Date(trip.dateOfEvent);
                        console.error("The user's timeoffset is not set!");
                    }
                    t += "<div id='box' data-id='" + trip._id + "'>";
                    t += "<div class='box-top'>" + trip.heading + "</div>";
                    t += "<div class='box-panel'>";
                    t += "<i>" + date.toGMTString() + "</i><br>";
                    t += trip.description + "<br><br>";
                    for (var i = 0; i < trip.participants.length; i++) {
                        calls.push(function (id) {
                            return function (cb) {
                                Load({user: {_id: id}}, cb);
                            };
                        }(trip.participants[i]));
                    }
                    if(calls.length == 0){
                        calls.push( function(cb){
                            cb(null, {name: "Ingen"});
                        });
                    }
                    async.parallel(calls, function (err, results) {
                        if (err) {
                            console.error(err);
                            next();
                        }
                        else {
                            t += "<strong>Påmeldte: </strong><br>";
                            for (i = 0; i < results.length; i++) {
                                t += results[i].name + "<br>";
                            }
                            t += "</div></div>";
                            res.render('myTrips', {menu: Extensions.getMenu(user, req.url), trips: t, footer: footerMSK});
                        }
                    });
                }
            });
        }
        else {
            Load({trip: {creator: req.cookies._id}}, function (err, trips) {
                if (err) {
                    console.error(err);
                    next();
                }
                else {
                    if (!(trips instanceof Array)) {
                        trips = [trips];
                    }
                    console.log(trips);
                    var t = "";
                    for (var i = 0; i < trips.length; i++) {
                        var calls = [];
                        var trip = trips[i];
                        var date = new Date(trip.dateOfEvent);
                        date = new Date(date.getTime() + (req.cookies.timeoffset * 3600 * 1000));
                        if (date == "Invalid Date") {
                            date = new Date(trip.dateOfEvent);
                            console.error("The user's timeoffset is not set!");
                        }
                        t += "<div id='box' data-id='" + trip._id + "'>";
                        t += "<div class='box-top'>" + trip.heading + "</div>";
                        t += "<div class='box-panel'>";
                        t += "<i>" + date.toGMTString() + "</i><br>";
                        t += trip.description;
                        t += "</div></div>";
                    }
                    t += "<br><button class='pure-button button-secondary' onclick='window.location = \"/trip/addTrip\";'>Opprett tur</button>";
                    res.render('myTrips', {menu: Extensions.getMenu(user, req.url), trips: t, footer: footerMSK});
                }
            });
        }
    });
});

router.get('/addTrip', function(req, res, next){
    Load({user: {_id: req.cookies._id}}, function(err, user){
        if(err){
            console.error(err);
            next();
            return;
        }
        else if(!user.tripAdmin){
            console.error("A user trying to access without admin access");
            next();
            return;
        }
        res.render('addTrip', {menu: Extensions.getMenu(user, req.url), footer: footerMSK});
    });
});

router.get('/', function(req, res, next){
    var par = {};
    console.log(req.query);
    if(!req.query.id) {
        next();
        return;
    }
    par._id = req.query.id;
    console.log(par);
    Load({trip: par}, function(err, trip){
        if(trip == undefined){
            next();
            return;
        }
        if(err){
            console.error(err);
            res.json(err);
        }
        else {
            var t = "";
            t += "<i>" + new Date(trip.dateOfEvent).toUTCString() + "</i><br><br>";
            t += trip.description + "<br><br>";
            if(findUser(req.cookies._id, trip.participants))
                t += "<button id='participate' class='pure-button button-error' data-id='" + trip._id + "'>Meld deg av</button>";
            else
                t += "<button id='participate' class='pure-button button-success' data-id='" + trip._id + "'>Meld deg på</button>";
            Load({user: {_id: req.cookies._id}}, function(err, user) {
                if(err) {
                    console.error(err);
                    next();
                }
                else
                    res.render('trip', {heading: trip.heading, menu: Extensions.getMenu(user, req.url), trip: t, footer: footerMSK});
            });
        }
    });
});

function findUser(id, table){
    if(table == undefined)
        return false;
    if(table.length == undefined)
        return false;
    for(var i = 0; i < table.length; i++){
        if(id == table[i])
            return true;
    }
    return false;
}

module.exports = router;