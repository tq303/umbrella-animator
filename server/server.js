'use strict'

const express    = require('express'),
	  bodyParser = require('body-parser'),
	  path       = require('path'),
	  fs         = require('fs'),
	  mkdirp     = require('mkdirp');


let app  = express();
let port = process.env.PORT || 5000;

// allow cors from webpack dev
if ( process.env.NODE_ENV !== 'production' ) app.use( require('./webpack-cors') );

// create animations folder
mkdirp.sync( path.join( __dirname, 'animations' ) );

// serve static files
app.use(express.static( path.join(__dirname, '..', 'public') ));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// get all animations
app.get('/api/animation',  (req, res)=> {
	fs.readdir( path.join( __dirname, 'animations' ), ( error, animations ) => {
		console.log(animations)
		res.send( animations );
	});
});

app.get('/api/animation/:id',  (req, res)=> {
	res.send(`single ${ req.params.id }`);
});

app.post('/api/animation',  (req, res)=> {

	if ( !req.body.name ) {

		return res.status(422).send('name is required');

	} else {

		fs.writeFileSync( path.join( __dirname, 'animations', `${ req.body.name }.json` ), JSON.stringify( req.body.frames ));
		return res.sendStatus(200);
	}

});

app.use((req, res, next)=> {
	res.status(404).sendStatus('invalid url');
});

// SERVER
app.listen(port);

console.log('Listening on port %d', port);