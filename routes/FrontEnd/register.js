/**
 * Created by andreashammer on 23/12/2016.
 */
var router = require('express').Router();

router.get('/', function(req, res){
    res.render('register', {});
});

module.exports = router;