/**
 * Created by andreashammer on 10/01/2017.
 */
var router = require('express').Router();

router.get('/', function(req, res){
    var ctn = "";
    ctn += "<button onclick='window.location=\"/login\"'>Login</button>";
    ctn += "<button onclick='window.location=\"/register\"'>Registrer</button>";
    res.render('landing', {});
});

module.exports = router;