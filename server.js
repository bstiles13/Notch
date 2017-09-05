// Dependencies
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var axios = require('axios');
var bcrypt = require('bcrypt');
var port = process.ENV || 8080;

// MongoDB configuration
var mongoose = require('mongoose');
var db = process.env.MONGODB_URI || "mongodb://localhost/notch";
var User = require('./model/user.js');

// Server configuration
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

// Connect mongoose to database
mongoose.connect(db, function (error) {
    if (error) {
        console.error(error);
    } else {
        console.log("mongoose connection is successful");
    }
});

// Routes
app.get('/', function (req, res) {
    res.send(path.join(__dirname + './public/index.html'));
})

app.post('/autocomplete', function (req, res) {
    // console.log(req.body);
    let city = req.body.city;
    let url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + city + '&types=(cities)&key=AIzaSyBXqI8e9LOV_SFIicNjz3q0WFhtYTL0JIQ';
    // let url = 'https://api.yelp.com/v3/businesses/search?term=' + req.body + '&location=estes+park&Authorization=Bearer ubaFEKFibK6WH876p2V7lk4nQW8vx9_B6HZPSbrlflrSOsoJb-iR47o5G_psT7xeCtqYVI-Y1OHiv4DNgl59oZpUYEG_eTh_j2PjyfTvdkxg_ixl8jltKBzx5CmoWXYx';
    // console.log(url);
    axios.get(url).then(data => {
        // console.log('axios');
        res.send(data.data.predictions);
    });
})

app.post('/getcoordinates', function (req, res) {
    let id = req.body.id;
    // console.log(id);
    let url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + id + '&key=AIzaSyBXqI8e9LOV_SFIicNjz3q0WFhtYTL0JIQ';
    axios.get(url).then(data => {
        // console.log(data.data.result.geometry.location);
        let location = data.data.result.geometry.location;
        res.send(location);
    })
})

app.post('/googleplaces', function (req, res) {
    // console.log(req.body);
    let term = req.body.searchTerm;
    let lat = req.body.latitude;
    let lng = req.body.longitude;
    let url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + lng + '&radius=200000&name=' + term + '&key=AIzaSyBXqI8e9LOV_SFIicNjz3q0WFhtYTL0JIQ';
    // let url = 'https://api.yelp.com/v3/businesses/search?term=' + req.body + '&location=estes+park&Authorization=Bearer ubaFEKFibK6WH876p2V7lk4nQW8vx9_B6HZPSbrlflrSOsoJb-iR47o5G_psT7xeCtqYVI-Y1OHiv4DNgl59oZpUYEG_eTh_j2PjyfTvdkxg_ixl8jltKBzx5CmoWXYx';
    axios.get(url).then(data => {
        // console.log(data.data);
        res.send(data.data);
    });
})

app.post('/placedetails', function (req, res) {
    // console.log(req.body);
    let id = req.body.id;
    let url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + id + '&key=AIzaSyBXqI8e9LOV_SFIicNjz3q0WFhtYTL0JIQ';
    axios.get(url).then(data => {
        // console.log(data.data);
        res.send(data.data);
    })
})

// Receives and authenticates login information from existing users
app.post('/existinguser', function (req, res) {
    console.log(req.body);
    User.findOne({ 'username': req.body.username }, function (err, user) {
        if (err) {
            console.log(err);
            res.send('unsuccessful');
        } else if (user == null) {
            console.log('no user');
            res.send('unsuccessful');
        } else {
            console.log(user);
            var savedHash = user.password;
            bcrypt.compare(req.body.password, savedHash, function(err, status) {
              console.log(status);
              status === true ? res.json('success') : res.json('unsuccessful');
            });
        }
    })
});

// Accepts login information from new users, checks if the username exists, and saves the user if unique
app.post('/newuser', function (req, res) {
    console.log(req.body);
    User.findOne({ 'username': req.body.username }, function (err, user) {
        if (err) {
            console.log(err);
            res.send('unsuccessful');
        } else if (user == null) {
            console.log('no user');
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(req.body.password1, salt, function (err, hash) {
                    var newUser = {
                        username: req.body.username,
                        password: hash
                    }
                    console.log(newUser);
                    User.create(newUser).then(data => {
                            console.log(data);
                            res.send('success');
                    }).catch(err => {
                        console.log(err);
                    })
                });
            });
        } else {
            console.log(user);
            res.send('unsuccessful');
        }
    });
});

// Start server
app.listen(port, function () {
    console.log('Server successful on port ' + port);
})