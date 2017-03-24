/**
 * Created by andreashammer on 15/09/16.
 */

var router = require('express').Router();
var login = require('./FrontEnd/login');
var register = require('./FrontEnd/register');
var trip = require('./FrontEnd/trip');
var recover = require('./FrontEnd/recover');
var profile = require('./FrontEnd/profile');
var landing = require('./FrontEnd/landing');
var badges = require('./FrontEnd/badges');

router.use(function(req, res, next){
    if(req.cookies.cookieconsent_dismissed != "yes" && req.url != "/login" && req.url != "/register" && req.url != "/landing" && req.url.indexOf("/recover") == -1 || req.cookies._id == undefined && req.url != "/login" && req.url != "/landing" && req.url != "/register" && req.url.indexOf("/recover") == -1){
        res.statusCode = 307;
        res.redirect("/landing");
        res.end();
        return;
    }
    else if(req.cookies.cookieconsent_dismissed == "yes" && req.cookies._id != undefined){
        switch (req.url){
            case "/login":
            case "/register":
                res.statusCode = 307;
                res.redirect("/");
                res.end();
                return;
        }
    }
    next();
});

router.use('/login', login);
router.use('/register', register);
router.use('/trip', trip);
router.use('/recover', recover);
router.use('/profile', profile);
router.use('/landing', landing);
router.use('/badges', badges);

router.get('/', function(req, res) {
    Load({trip: {}, user: {_id: req.cookies._id}}, function(err, data){
        console.log(data);
        if(err) {
            console.error(err);
            res.send(500, "Something broke");
            return;
        }
        var user, trips;
        for(var i = 0; i < data.length; i++) {
            if (data[i].key == "user") {
                user = data[i].data;
            }
            else if (data[i].key == "trip") {
                trips = data[i].data;
                if (!(trips instanceof Array)) {
                    trips = [trips];
                }
            }
        }
        var t = "";

        for(i = 0; i < trips.length; i++){
            var trip = trips[i];
            var date = new Date(trip.dateOfEvent);
            date = new Date(date.getTime() + (req.cookies.timeoffset * 3600 * 1000));
            if(date == "Invalid Date") {
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
        res.render('index', {menu: Extensions.getMenu(user, req.url), trips: t, footer: footerMSK});
    });
});

module.exports = router;