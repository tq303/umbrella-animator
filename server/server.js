'use strict'

const express    = require('express'),
	  bodyParser = require('body-parser'),
	  path       = require('path');

const webpackProxy = require('./webpack-proxy');

let app  = express();
let port = process.env.PORT || 3000;

webpackProxy(app)

app.use(express.static( path.resolve(__dirname, 'public') ));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/api/animation',  (req, res)=> {
	res.status(200).send('all');
});

app.get('/api/animation/:id',  (req, res)=> {
	res.status(200).send(`single ${ req.params.id }`);
});

app.post('/api/animation',  (req, res)=> {
	res.status(200).send('saved');
});

app.use((req, res, next)=> {
	res.status(404).send('invalid url');
});

// SERVER
app.listen(port);

console.log('Listening on port %d', port);