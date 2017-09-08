// Dependencies
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var axios = require('axios');
var bcrypt = require('bcrypt');
var routes = require('./controller/routes.js');
const PORT = process.env.PORT || 9000;

// MongoDB configuration
var mongoose = require('mongoose');
var db = process.env.MONGODB_URI || "mongodb://localhost/notch";
var User = require('./model/user.js');
var Notch = require('./model/notch.js');

// Server configuration
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use('/', routes);

// Connect mongoose to database
mongoose.connect(db, function (error) {
    if (error) {
        console.error(error);
    } else {
        console.log("mongoose connection is successful");
    }
});

// Start server
app.listen(PORT, function () {
    console.log('Server successful on port ' + port);
})