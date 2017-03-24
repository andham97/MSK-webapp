/**
 * Created by andreashammer on 18/02/2017.
 */
var router = require('express').Router();

router.get('/new', function(req, res, next){
    Load({user: {_id: req.cookies._id}}, function(err, user){
        if(err) {
            console.error(err);
            res.send(500, "Something broke");
            return;
        }
        if(!user.tripAdmin) {
            next();
            return;
        }
        res.render('addBadge', {menu: Extensions.getMenu(user, req.url), trips: "", footer: footerMSK});
    });
});

router.get('/', function(req, res){
    if(!req.query.id || req.query.id == undefined){
        overview(req, res);
    }
    else {
        badge(req, res);
    }
});

function overview(req, res){
    Load({badge: {}, user: {_id: req.cookies._id}}, function(err, data){
        if(err) {
            console.error(err);
            res.send(500, "Something broke");
            return;
        }
        var user, badges;
        for(var i = 0; i < data.length; i++) {
            if (data[i].key == "user") {
                user = data[i].data;
            }
            else if (data[i].key == "badge") {
                badges = data[i].data;
                if (!(badges instanceof Array)) {
                    badges = [badges];
                }
            }
        }
        var t = user.tripAdmin ? "<a href='/badges/new' class='button-secondary pure-button link'>Nytt merke</a>" : "";

        for(i = 0; i < badges.length; i++){
            var badge = badges[i];
            t += "<div id='box' data-id='" + badge._id + "'>";
            t += "<div class='box-top'>" + badge.title + "</div>";
            t += "<div class='box-panel'>";
            if(badge.image == "gullklaff.png") {
                t += "<img src='/images/badges/" + badge.image + "' style='-webkit-filter: none; margin-top: -13px; filter: none; float: right; width: " + badge.width / 5 + "px; height: " + badge.height / 5 + "px;'>";
            }
            else if(badge.image) {
                t += "<img src='/images/badges/" + badge.image + "' style='-webkit-filter: none; margin-top: -5px; filter: none; float: right; width: " + badge.width / 2 + "px; height: " + badge.height / 2 + "px;'>";
            }
            t += "<br>" + badge.description;
            t += "</div></div>";
        }
        res.render('badge', {menu: Extensions.getMenu(user, req.url), trips: t, footer: footerMSK});
    });
}

function badge(req, res){
    Load({badge: {_id: req.query.id}, user: {_id: req.cookies._id}}, function(err, data){
        if(err) {
            console.error(err);
            res.send(500, "Something broke");
            return;
        }
        var user, badges;
        for(var i = 0; i < data.length; i++) {
            if (data[i].key == "user") {
                user = data[i].data;
            }
            else if (data[i].key == "badge") {
                badges = data[i].data;
                if (!(badges instanceof Array)) {
                    badges = [badges];
                }
            }
        }
        var t = "";

        for(i = 0; i < badges.length; i++){
            var badge = badges[i];
            t += "<div id='box' data-id='" + badge._id + "'>";
            t += "<div class='box-top'>" + badge.title + "</div>";
            t += "<div class='box-panel'>";
            if(badge.image) {
                t += "<img src='/images/badges/" + badge.image + "' style='-webkit-filter: none; margin-right: 50px; margin-top: 25px; filter: none; float: right; width: " + badge.width + "px; height: " + badge.height + "px;'>";
            }
            t += "<i>" + badge.description + "</i><br><br>";
            for(var j = 0; j < badge.requirements.length; j++){
                var r = badge.requirements[j];
                t += "<strong>" + (j + 1) + ".</strong> " + r + "<br><br>";
            }
            if(!findUser(req.cookies._id, badge.completedBy))
                t += "<button id='participate' class='pure-button button-success' data-id='" + badge._id + "'>Fullført</button>";
            else
                t += "<span class='pure-button button-success'>Allerede fullført</span>";
            t += "</div></div>";
        }
        res.render('badge', {menu: Extensions.getMenu(user, req.url), trips: t, footer: footerMSK});
    });
}

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