let bodyParser = require('body-parser');
let axios = require('axios');
let bcrypt = require('bcrypt');

let User = require('./user.js');
let Notch = require('./notch.js');

let key = 'AIzaSyBXqI8e9LOV_SFIicNjz3q0WFhtYTL0JIQ';

module.exports = {

    autocomplete: function (req, res) {
        // console.log(req.body);
        let city = req.body.city;
        let url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + city + '&types=(cities)&key=' + key;
        // let url = 'https://api.yelp.com/v3/businesses/search?term=' + req.body + '&location=estes+park&Authorization=Bearer ubaFEKFibK6WH876p2V7lk4nQW8vx9_B6HZPSbrlflrSOsoJb-iR47o5G_psT7xeCtqYVI-Y1OHiv4DNgl59oZpUYEG_eTh_j2PjyfTvdkxg_ixl8jltKBzx5CmoWXYx';
        // console.log(url);
        axios.get(url).then(data => {
            // console.log('axios');
            res.send(data.data.predictions);
        });
    },

    getCoordinates: function (req, res) {
        let id = req.body.id;
        // console.log(id);
        let url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + id + '&key=' + key;
        axios.get(url).then(data => {
            // console.log(data.data.result.geometry.location);
            let location = data.data.result.geometry.location;
            res.send(location);
        })
    },

    googlePlaces: function (req, res) {
        // console.log(req.body);
        let term = req.body.searchTerm;
        let lat = req.body.latitude;
        let lng = req.body.longitude;
        let url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + lng + '&radius=200000&name=' + term + '&key=' + key;
        // let url = 'https://api.yelp.com/v3/businesses/search?term=' + req.body + '&location=estes+park&Authorization=Bearer ubaFEKFibK6WH876p2V7lk4nQW8vx9_B6HZPSbrlflrSOsoJb-iR47o5G_psT7xeCtqYVI-Y1OHiv4DNgl59oZpUYEG_eTh_j2PjyfTvdkxg_ixl8jltKBzx5CmoWXYx';
        axios.get(url).then(data => {
            // console.log(data.data);
            res.send(data.data);
        });
    },

    placeDetails: function (req, res) {
        // console.log(req.body);
        let id = req.body.id;
        let url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + id + '&key=' + key;
        axios.get(url).then(data => {
            // console.log(data.data);
            res.send(data.data);
        })
    },

    existingUser: function (req, res) {
        // console.log(req.body);
        User.findOne({ 'username': req.body.username }, function (err, user) {
            if (err) {
                console.log(err);
                res.send('unsuccessful');
            } else if (user == null) {
                // console.log('no user');
                res.send('unsuccessful');
            } else {
                // console.log(user);
                var savedHash = user.password;
                bcrypt.compare(req.body.password, savedHash, function (err, status) {
                    // console.log(status);
                    status === true ? res.json('success') : res.json('unsuccessful');
                });
            }
        })
    },

    newUser: function (req, res) {
        // console.log(req.body);
        User.findOne({ 'username': req.body.username }, function (err, user) {
            if (err) {
                console.log(err);
                res.send('unsuccessful');
            } else if (user == null) {
                // console.log('no user');
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(req.body.password1, salt, function (err, hash) {
                        let newUser = {
                            username: req.body.username,
                            password: hash,
                            zipcode: req.body.zipCode
                        }
                        // console.log(newUser);
                        User.create(newUser).then(data => {
                            // console.log(data);
                            res.send('success');
                        }).catch(err => {
                            console.log(err);
                        })
                    });
                });
            } else {
                // console.log(user);
                res.send('unsuccessful');
            }
        });
    },

    newNotch: function (req, res) {
        // console.log(req.body);
        let categories = req.body.category.split('|');
        let notch = {
            "geometry": {
                "coordinates": [req.body.lng.toString(), req.body.lat.toString()]
            },
            "properties": {
                "user": req.body.user,
                "category_parent": categories[0].trim(),
                "category_child": categories[1].trim(),
                "place": req.body.place,
                "headline": req.body.headline,
                "summary": req.body.summary,
            }
        }
        // console.log(notch);
        Notch.create(notch).then(data => {
            // console.log(data);
            res.send('success');
        }).catch(err => {
            console.log(err);
            res.send('unsuccessful');
        })
    },

    getNotches: function (req, res) {
        // console.log(req.body);
        // console.log('finding notches');
        let lng = req.body.lng;
        let lat = req.body.lat;
        if (req.body.category != 'All') {
            let category = req.body.category.split("|");
            var parent = category[0].trim();
            var child = category[1].trim();
        } else {
            var parent = { $exists: true }
            var child = { $exists: true }
        }
        Notch.find({
            "geometry": {
                $near: {
                    $geometry: { type: "Point", coordinates: [lng, lat] },
                    $maxDistance: 160000
                }
            },
            "properties.category_parent": parent,
            "properties.category_child": child
        }
        ).then(data => {
            // console.log('found notches');
            // console.log(data);
            res.send(data);
        }).catch(err => {
            console.log('Error: ' + err);
        })
    },

    findOne: function (req, res) {
        // console.log(req.body);
        Notch.findById(req.body.id, function (err, data) {
            if (err) {
                console.log(err);
                res.send('unsuccessful');
            } else {
                // console.log('found one');
                // console.log(data);
                res.send(data);
            }
        })
    },

    userNotches: function(req, res) {
        console.log(req.body);
        Notch.find({"properties.user": req.body.user}, function(err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log('user notches');
                console.log(data);
                res.send(data);
            }
        })
    },

    deleteNotch: function(req, res) {
        Notch.findByIdAndRemove(req.body.id, function(err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
                res.send('success');
            }
        })
    }
}