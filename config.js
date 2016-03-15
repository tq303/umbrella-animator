const apiUrl = '';

if (process.env.NODE_ENV === 'production') {
	apiUrl = '';
} else {
	apiUrl = 'http://localhost:8008/api/animation'
}

module.exports = {
	api: {
		url: apiUrl
	}
};