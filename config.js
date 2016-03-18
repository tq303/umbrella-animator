const apiUrl = ( process.env.NODE_ENV === 'production' ) ? '' : 'http://localhost:3000/api/animation';

module.exports = {
	api: {
		url: apiUrl
	},
	request: {
		headers: {
			method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
		}
	}
};