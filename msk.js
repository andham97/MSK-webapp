/**
 * Created by andreashammer on 18/11/16.
 */
var express = require('express');
var fs = require('fs');
var path = require('path');
var FrontEnd = require('./routes/FrontEnd');
var API = require('./routes/API');

footerMSK = fs.readFileSync(path.join(__dirname, "./public/templates/footer.html"));

var router = express.Router();

router.use('/api', API);
router.use('/', FrontEnd);

module.exports = router;