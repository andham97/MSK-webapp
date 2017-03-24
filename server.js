// Load the plugins and API
var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');

var options = {
    server: {
        socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS: 30000
        }
    },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

var mongoURI = "mongodb://hokon86:hammer456@ds133348.mlab.com:33348/heroku_4xjqv46d";
//var mongoURI = "mongodb://localhost:27017/MSK";

Load = "";
Create = "";
Update = "";
Mailer = "";
Extensions = "";
TestingMode = false;

console.log("Connecting to MongoDB...");
mongoose.connect(mongoURI, options);
connection = mongoose.connection;
connection.on("error", console.error.bind(console, 'connection error: '));
connection.on("open", function(){
    console.log("Connected to MongoDB");

    var bodyParser = require('body-parser');
    var favicon = require('serve-favicon');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var MSK = require('./msk');

    Load = require('./routes/internal/load');
    Create = require('./routes/internal/create');
    Update = require('./routes/internal/update');
    Mailer = require('./routes/internal/mail');
    Extensions = require('./routes/internal/extensions');

    // Setup json formatting
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(logger('common'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    var port = process.env.PORT || 8000;
    console.log(port);

    // Add the API Routing
    app.use('/', MSK);

    app.get('*', function(req, res){
        res.render('error', {});
    });

    // Start the server
    app.listen(port);
    console.log("Server is running...");
});