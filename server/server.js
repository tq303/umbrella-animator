'use strict'

const express    = require('express'),
	  bodyParser = require('body-parser'),
	  path       = require('path'),
	  mkdirp     = require('mkdirp');


let app  = express();
let port = process.env.PORT || 3000;

// allow cors from webpack dev
if ( process.env.NODE_ENV !== 'production' ) app.use( require('./webpack-cors') )

// create animations folder
mkdirp.sync( path.join( __dirname, 'animations' ) )

app.use(express.static( path.resolve(__dirname, 'public') ));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/api/animation',  (req, res)=> {
	res.send('all');
});

app.get('/api/animation/:id',  (req, res)=> {
	res.send(`single ${ req.params.id }`);
});

app.post('/api/animation',  (req, res)=> {
	res.send( req.body );
});

app.use((req, res, next)=> {
	res.status(404).sendStatus('invalid url');
});

// SERVER
app.listen(port);

console.log('Listening on port %d', port);