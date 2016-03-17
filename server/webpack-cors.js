module.exports = (  req, res, next ) => {

	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS, HEAD');
	res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization');

	if ( req.method == 'OPTIONS' ) {
        return res.sendStatus(200);
    }

    return next();
}
