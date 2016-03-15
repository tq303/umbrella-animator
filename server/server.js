'use strict'

const express = require('express'),
	  bodyParser = require('body-parser');

let app  = express();
let port = process.env.PORT || 8008;

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/api/animation', function (req, res) {

});

app.get('/api/animation/:id', function (req, res) {

});

app.post('/api/animation', function (req, res) {

});

// SERVER
app.listen(port);

console.log('Listening on port %d', port);