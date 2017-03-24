/**
 * Created by andreashammer on 26/12/2016.
 */
var router = {};
var Mailin = require('../mailin');
var fs = require('fs');
var path = require('path');
var ejs = require('ejs');

var recoveryMail = fs.readFileSync(path.join(__dirname, '../../public/templates/recovery_mail.html'), "utf-8");
var button = fs.readFileSync(path.join(__dirname, '../../public/templates/recovery_button.html'), "utf-8");

var mailer = new Mailin("https://api.sendinblue.com/v2.0", "sqtwfQXZGO7vKMpk");

router.send_recovery_mail = function(user, cb){
    var to = {};
    to[user.email] = user.name;

    var input = {
        to: to,
        from: ["spillkonsoll@icloud.com", "Andreas Hammer"],
        subject: "Gjenopprett passord",
        html: ejs.render(recoveryMail, {button: insert(button, 9, 0, (TestingMode ? "http://localhost:8000/recover?id=" : "http://msk-tur.herokuapp.com/recover?id=") + user._id)})
    };

    mailer.send_email(input).on('complete', function(data){
        console.log(data);
        cb(200, "Success");
    });
};

function insert(ip, idx, rem, str) {
    return ip.slice(0, idx) + str + ip.slice(idx + Math.abs(rem));
}

module.exports = router;