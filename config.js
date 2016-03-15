const apiUrl = (process.env.NODE_ENV === 'production') ? '' : 'http://localhost:8008/api/animation';

module.exports = {
	api: {
		url: apiUrl
	}
};