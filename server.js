// Dependencies
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let axios = require('axios');
let bcrypt = require('bcrypt');
let routes = require('./controller/routes.js');
let PORT = process.env.PORT || 9000;

// MongoDB configuration
let mongoose = require('mongoose');
let db = process.env.MONGODB_URI || "mongodb://localhost/notch";
let User = require('./model/user.js');
let Notch = require('./model/notch.js');

// Server configuration
let app = express();
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
    console.log('Server successful on port ' + PORT);
})