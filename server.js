var express = require('express');
var bodyParser = require('body-parser');
var port = process.ENV || 8080;

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.listen(port, function() {
    console.log('Server successful on port ' + port);
})

app.get('/', function(req, res) {
    res.send('./public/index.html');
})