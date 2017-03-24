/**
 * Created by andreashammer on 15/09/16.
 */

var router = require('express').Router();

router.use('/user', require('./API/user'));
router.use('/trip', require('./API/trip'));
router.use('/badge', require('./API/badge'));

module.exports = router;