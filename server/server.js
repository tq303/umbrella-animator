'use strict'

const express    = require('express'),
	  bodyParser = require('body-parser'),
	  path       = require('path');


let app  = express();
let port = process.env.PORT || 3000;

// allow cors from webpack dev
if ( process.env.NODE_ENV !== 'production' ) app.use( require('./webpack-cors') )


app.use(express.static( path.resolve(__dirname, 'public') ));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/api/animation',  (req, res)=> {
	res.status(200).sendStatus('all');
});

app.get('/api/animation/:id',  (req, res)=> {
	res.status(200).sendStatus(`single ${ req.params.id }`);
});

app.post('/api/animation',  (req, res)=> {
	res.status(200).sendStatus('saved');
});

app.use((req, res, next)=> {
	res.status(404).sendStatus('invalid url');
});

// SERVER
app.listen(port);

console.log('Listening on port %d', port);