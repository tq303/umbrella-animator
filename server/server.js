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
	res.status(200).send('all');
});

app.get('/api/animation/:id', function (req, res) {
	res.status(200).send(`single ${ req.params.id }`);
});

app.post('/api/animation', function (req, res) {
	res.status(200).send('saved');
});

app.use(function(req, res, next) {
  res.status(404).send('invalid url');
});

// SERVER
app.listen(port);

console.log('Listening on port %d', port);