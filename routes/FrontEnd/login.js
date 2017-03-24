/**
 * Created by andreashammer on 19/11/2016.
 */
var router = require('express').Router();

router.get('/', function(req, res){
    res.render('login', {});
});

module.exports = router;