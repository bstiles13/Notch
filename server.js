var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var axios = require('axios');
var port = process.ENV || 8080;

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.listen(port, function () {
    console.log('Server successful on port ' + port);
})

app.get('/', function (req, res) {
    res.send(path.join(__dirname + './public/index.html'));
})

app.post('/yelp', function (req, res) {
    console.log(req.body);
    let term = req.body.search;
    let url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=39.849312,-104.673828&radius=500&name=' + term + '&key=AIzaSyC1-zEIcdJjRV_mHhU5X54clZdwuqMJxbk';
    // let url = 'https://api.yelp.com/v3/businesses/search?term=' + req.body + '&location=estes+park&Authorization=Bearer ubaFEKFibK6WH876p2V7lk4nQW8vx9_B6HZPSbrlflrSOsoJb-iR47o5G_psT7xeCtqYVI-Y1OHiv4DNgl59oZpUYEG_eTh_j2PjyfTvdkxg_ixl8jltKBzx5CmoWXYx';
    axios.get(url).then(data => {
        console.log(data);
        res.send(data.data);
    });
})

app.post('/autocomplete', function (req, res) {
    console.log(req.body);
    let city = req.body.city;
    let url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + city + '&types=(cities)&key=AIzaSyC1-zEIcdJjRV_mHhU5X54clZdwuqMJxbk';
    // let url = 'https://api.yelp.com/v3/businesses/search?term=' + req.body + '&location=estes+park&Authorization=Bearer ubaFEKFibK6WH876p2V7lk4nQW8vx9_B6HZPSbrlflrSOsoJb-iR47o5G_psT7xeCtqYVI-Y1OHiv4DNgl59oZpUYEG_eTh_j2PjyfTvdkxg_ixl8jltKBzx5CmoWXYx';
    console.log(url);
    axios.get(url).then(data => {
        console.log('axios');
        res.send(data.data.predictions);
    });
})

app.post('/getlatlng', function(req, res) {
    let url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJJ8Jse77m7IARRg_vzsKQArw&key=AIzaSyC1-zEIcdJjRV_mHhU5X54clZdwuqMJxbk';
})