'use strict';

const https = require('https')

var fetchIssue = (config, issues, flag, callback) => {
	const states = ['open', 'closed', 'all']
	if (states.indexOf(flag) == -1) {
		let err = `Invalid argument specified for fetch issue.`
		throw err;
	}
	const	pathUrl = config.url.replace('https://www.github.com', '/repos'),
	        fg = typeof flag === 'string' ? flag : 'open',
	        options = {
				hostname: 'api.github.com',
				path: pathUrl + '/issues?state=' + fg,
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
				issues = JSON.parse(data)
			} catch (e) {
				console.log(e.message)
			}
			if (typeof callback === 'function')
				callback(issues)
		})
	}).on('error', (err) => {
		throw err;
	})
}

module.exports = fetchIssue