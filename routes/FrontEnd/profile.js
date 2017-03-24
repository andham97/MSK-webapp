/**
 * Created by andreashammer on 05/01/2017.
 */
var router = require('express').Router();
var path = require('path');
var fs = require('fs');

router.get('/', function(req, res, next){
    Load({user: {_id: req.cookies._id}}, function(err, user) {
        var ctn = "";
        var reset = fs.readFileSync(path.join(__dirname, "../../public/templates/passwordreset.html"));
        ctn += reset;
        res.render('profile', {menu: Extensions.getMenu(user), content: ctn, username: user.username, name: user.name, footer: footerMSK});
    });
});

module.exports = router;