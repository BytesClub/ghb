'use strict';

const https = require('https')

var fetchPulls = (config, pulls, flag, callback) => {
	const states = ['open', 'closed', 'all']
	if (states.indexOf(flag) == -1) {
		let err = `Invalid argument specified for fetch pulls.`
		throw err;
	}
	const	pathUrl = config.url.replace('https://www.github.com', '/repos'),
	        fg = typeof flag !== 'undefined'? flag : 'open',
	        options = {
				hostname: 'api.github.com',
				path: pathUrl + '/pulls?state=' + fg,
				headers: {
					'Accepts': 'application/json',
					'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
			    }
	        }
	https.get(options, (res) => {
		if (res.statusCode !== 200){
			let err = `Error: Connection error occured. Please check your net connection and try later.`
			throw err;
		}
		let data = ''
		res.on('data', (chunk) => {
			data += chunk
		})
		res.on('end', () => {
			try {
				pulls = JSON.parse(data)
				if (typeof callback === 'function')
					callback(pulls)
			} catch (e) {
				console.log(e.message)
			}
		})
	}).on('error', (err) => {
		throw err;
	})
}

module.exports = fetchPulls