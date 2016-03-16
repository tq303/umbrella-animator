const proxy = require('http-proxy').createProxyServer();

module.exports = function ( app ) {
	
	// proxy requests from webpack
	if ( process.env.NODE_ENV !== 'production' ) {

		app.all('/*',  (req, res)=> {

			res.header('Access-Control-Allow-Origin', '*');
	    	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS, HEAD');
	    	res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization');

			proxy.web(req, res, {
				target: 'http://localhost:8888'
			});
		});
	}

	// handle proxy error
	proxy.on('error', (e)=> {
		console.log('Could not connect to proxy, please try again...');
	});

}
